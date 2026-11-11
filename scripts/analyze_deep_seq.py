#!/usr/bin/env python3
"""
Analyze real deep sequencing reads from SRR39847752 against the 701 collagen CpG dyad targets.
Calculates coverage depth, background error noise, and performs in silico spike-in simulation
for low-frequency de novo / mosaic G>A deamination transitions.
"""

import subprocess
import re
from collections import Counter
import math

def parse_pileup_bases(ref_base, bases_str):
    """Parse mpileup read bases string into nucleotide counts."""
    # Remove ^. (read start and mapQ) and $ (read end)
    cleaned = ""
    i = 0
    n = len(bases_str)
    while i < n:
        c = bases_str[i]
        if c == '^':
            i += 2  # skip ^ and following ascii char
        elif c == '$':
            i += 1
        elif c in '+-':
            # indel: +2AG or -1T
            i += 1
            num_str = ""
            while i < n and bases_str[i].isdigit():
                num_str += bases_str[i]
                i += 1
            indel_len = int(num_str) if num_str else 0
            i += indel_len
        elif c == '*':
            i += 1  # deletion placeholder
        else:
            cleaned += c
            i += 1
            
    counts = Counter()
    for c in cleaned:
        cu = c.upper()
        if c in '.,':
            counts[ref_base.upper()] += 1
        elif cu in 'ACGTN':
            counts[cu] += 1
    return counts

def binomial_pvalue(k, n, p):
    """Accurate one-sided p-value using log-space Poisson approximation for large n and small p."""
    if k > n or n == 0:
        return 1.0
    lam = n * p
    if lam <= 0:
        return 0.0 if k > 0 else 1.0
    # P(X >= k) = 1 - P(X < k) = 1 - sum_{i=0}^{k-1} exp(-lam + i*ln(lam) - lgamma(i+1))
    cdf = 0.0
    for i in range(k):
        log_term = -lam + i * math.log(lam) - math.lgamma(i + 1)
        cdf += math.exp(log_term)
    pval = max(0.0, 1.0 - cdf)
    return pval

def main():
    bam_path = "data/sra_samples/SRR39847752_mapped.bam"
    
    # Run mpileup on targets
    cmd = [
        "samtools", "mpileup",
        "-f", "data/sra_samples/collagen_701_targets.fa",
        "-Q", "13",  # base quality threshold
        "-q", "10",  # mapping quality threshold
        "-d", "50000",
        bam_path
    ]
    
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    target_data = {}
    
    for line in proc.stdout:
        parts = line.strip().split('\t')
        if len(parts) < 6:
            continue
        chrom, pos_str, ref_base, depth_str, bases, quals = parts[:6]
        pos = int(pos_str)
        depth = int(depth_str)
        
        # We focus on positions 98-104 (CpG dyad is at 100: C, 101: G)
        if 98 <= pos <= 104:
            if chrom not in target_data:
                target_data[chrom] = {}
            counts = parse_pileup_bases(ref_base, bases)
            target_data[chrom][pos] = {
                "ref": ref_base,
                "depth": depth,
                "counts": counts
            }
            
    proc.wait()
    
    print("=" * 80)
    print("REAL DEEP SEQUENCING ANALYSIS ON COLLAGEN CPG DYADS (SRR39847752)")
    print("=" * 80)
    
    covered_targets = [t for t, pdict in target_data.items() if 101 in pdict and pdict[101]["depth"] >= 50]
    print(f"\nFound {len(covered_targets)} collagen CpG target sites with depth >= 50x (max depth up to >7,000x):\n")
    
    results = []
    
    for tid in covered_targets:
        c_pos = target_data[tid].get(100, {})
        g_pos = target_data[tid].get(101, {})
        
        g_depth = g_pos.get("depth", 0)
        g_ref = g_pos.get("ref", "N")
        g_counts = g_pos.get("counts", Counter())
        
        # G>A transition count and background rate
        alt_count = g_counts.get("A", 0)
        ref_count = g_counts.get("G", 0)
        vaf = (alt_count / g_depth) if g_depth > 0 else 0.0
        
        # Other mismatches (C, T) to estimate sequencing noise baseline
        other_noise = g_counts.get("C", 0) + g_counts.get("T", 0)
        noise_rate = (other_noise / (g_depth * 2)) if g_depth > 0 else 0.0005
        if noise_rate == 0:
            noise_rate = 0.0003  # empirical Illumina baseline
            
        results.append({
            "target": tid,
            "depth": g_depth,
            "ref": g_ref,
            "ref_count": ref_count,
            "alt_count": alt_count,
            "vaf": vaf,
            "noise_rate": noise_rate
        })
        
    results.sort(key=lambda x: x["depth"], reverse=True)
    
    # Print table of covered sites
    print(f"{'Target Site':<45} | {'Depth':<8} | {'Ref(G)':<7} | {'Alt(A)':<7} | {'Obs VAF':<9} | {'Noise Est'}")
    print("-" * 88)
    for r in results:
        print(f"{r['target']:<45} | {r['depth']:<8} | {r['ref_count']:<7} | {r['alt_count']:<7} | {r['vaf']*100:.3f}%   | {r['noise_rate']*100:.3f}%")
        
    print("\n" + "=" * 80)
    print("IN SILICO SPIKE-IN SIMULATION: DE NOVO / MOSAIC CPG G>A TRANSITION DETECTION")
    print("=" * 80)
    
    # Choose top 2 high-depth sites for in silico spike-in simulation
    test_sites = results[:2]
    sim_vafs = [0.0005, 0.001, 0.002, 0.005, 0.010, 0.020]  # 0.05% to 2.0%
    
    for ts in test_sites:
        print(f"\nTarget: {ts['target']}")
        print(f"Real Sequencing Depth: {ts['depth']:,}x | Baseline Error Rate: {ts['noise_rate']*100:.3f}%\n")
        print(f"{'Spike VAF':<12} | {'Exp Mutant Reads':<18} | {'Exp Background Noise':<22} | {'Binomial P-value':<18} | {'Detection Power'}")
        print("-" * 88)
        
        depth = ts['depth']
        bg_rate = max(0.0005, ts['noise_rate'])
        
        for svaf in sim_vafs:
            exp_mut = round(depth * svaf)
            exp_bg = round(depth * bg_rate)
            total_alt = exp_mut + exp_bg
            
            # P-value comparing total_alt against null hypothesis of pure bg_rate
            pval = binomial_pvalue(total_alt, depth, bg_rate)
            
            status = "STRONG DETECT (p < 1e-6)" if pval < 1e-6 else ("DETECTED (p < 0.01)" if pval < 0.01 else "BELOW NOISE (p >= 0.01)")
            print(f"{svaf*100:6.3f}%      | {exp_mut:<18} | {exp_bg:<22} | {pval:<18.2e} | {status}")

if __name__ == "__main__":
    main()
