# Methyl-CpG Hotspot Explorer in Collagen Disorders

[![License: PolyForm Noncommercial 1.0.0](https://img.shields.io/badge/License-PolyForm%20Noncommercial%201.0.0-blue.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-f38020.svg)](https://methyl-cpg.pages.dev)
[![GitHub Pages](https://img.shields.io/badge/Website-GitHub%20Pages-222222.svg)](https://jingjinaccubit.github.io/Methyl-CpG/)

A bioinformatics research web platform for detecting CpG mutational hotspots, evolutionary depletion, ClinVar recurrence, and gnomAD de novo mutation probability across human collagen genes.

Based on the research:
> **Methyl-CpG Sites and Mutational Hotspots in Alport Syndrome**  
> *Journal of the American Society of Nephrology (JASN)*  
> **DOI**: [10.1681/ASN.0000001308](https://doi.org/10.1681/ASN.0000001308)

---

## Features

- **Input Support**:
  - Dropdown library of **28 human collagen types (44 genes)** based on canonical **MANE Select (v1.5)** transcripts.
  - Quick 1-click presets: `COL4A5 (Alport Benchmark)`, `COL1A1 (OI / EDS)`, `COL3A1 (Vascular EDS)`.
  - Custom sequence textarea for pasting arbitrary FASTA or cDNA sequences, with reading frame selector (+0, +1, +2).
- **T1: Evolutionary Depletion**:
  - Quantifies CpG dyad depletion at collagenous Glycines against the human coding genome (MANE Select: 14.3%).
  - Within-gene controls comparing Yaa codons ending in C against all other codons in the gene ending in C.
  - Guanine-initial controls (Ala, Val, Asp, Glu).
  - Proline CCC codon depletion test at Yaa positions ($\chi^2$ goodness-of-fit with Lanczos gamma and Lentz continued fractions at $df=3$ against Kazusa codon database).
  - Non-proline Yaa codons capable of ending in cytosine.
- **T2: ClinVar Mutational Hotspots**:
  - Cross-references reported Pathogenic/Likely Pathogenic missense variants in ClinVar using real NCBI ClinVar variation IDs (auto-updated monthly).
  - Symmetrical first-base G>A missense comparison between CpG and non-CpG glycines.
  - Multiple independent submitters recurrence proxy (100% at CpG vs ~30–38% at non-CpG depending on P/LP curation and ClinVar release snapshot).
  - Flags candidate hotspots (unreported or VUS in ClinVar) for targeted biobank discovery.
  - *Methodology Note*: Both the published JASN paper and this live platform strictly evaluate single-nucleotide first-base G>A missense variants symmetrically filtered for Pathogenic / Likely Pathogenic (P/LP) status on both CpG and non-CpG sides. In COL4A5, the June 2024 paper benchmark identified 173 non-CpG P/LP glycines (OR = 7.63), while the live NCBI ClinVar database snapshot contains 182 non-CpG P/LP glycines (OR = 7.01). Minor numerical differences strictly reflect ongoing ClinVar database updates over time.
- **T3: gnomAD SNV & Mutability**:
  - Evaluates context-dependent mutation probability score ($\mu \approx 1.18–1.42 \times 10^{-7}$, top 0.3%–0.9% percentile, ~10–12x elevation) based on reverse-strand 5mC hydrolytic deamination contexts (Karczewski et al., Nature 2020 Supplementary Dataset 1; Roufayel et al., 2020).
  - Classifies variants into:
    - *Prone to Recurrent De Novo*
    - *Potential Somatic De Novo*
    - *Candidate Hotspot (Unreported)*
    - *Germline / Low Mutability*
- **T4: Comprehensive Report & Visualizations**:
  - **Sequence Logo**: SVG-based nucleotide frequency logo across 9 positions (Yaa-1, Yaa-2, Yaa-3, Gly-1, Gly-2, Gly-3, Xaa-1, Xaa-2, Xaa-3) with probability scale (0.0 to 1.0).
  - **Forest Plot**: Visualizes Odds Ratios and exact 95% Confidence Intervals on log scale with neutral line at $OR = 1.0$.
  - **Hotspot Prediction Table**: Matching JASN Figure 1J with codon junctions, transitions, amino acid changes, and destabilization severity (Severe Gly→Arg vs Moderate Gly→Ser).
  - **Export**: One-click Export to PDF and CSV download (including full gnomAD population allele counts, numbers, and observed status).
- **Collagen Table Reference**:
  - Searchable modal containing all 44 genes, OMIM numbers, chromosome loci, and syndrome descriptions.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build & Static Preview
```bash
npm run build
npm run preview
```
Open `http://localhost:4173` in your browser.

---

## Static Architecture & Deployment

This application is built as a pure client-side static web application (SPA) with zero backend dependency. The built `dist/` directory can be deployed directly to:
- **GitHub Pages**
- **Cloudflare Pages**
- **Vercel**
- **Netlify**

---

## License & Commercial Licensing

This project is open-source for noncommercial use under the terms of the **[PolyForm Noncommercial License 1.0.0](LICENSE)**.

### Permitted Uses (Free of Charge)
- Academic and educational research.
- Evaluation, personal study, and experimental testing.
- Non-profit healthcare, clinical genetics research, and public safety organizations.

### Commercial Licensing
Any commercial use, including but not limited to:
- Integration into fee-for-service genetic testing panels or diagnostic pipelines;
- Proprietary commercial bioinformatics platforms or SaaS offerings;
- For-profit pharmaceutical or therapeutic R&D screening;

**requires a commercial license**. For commercial licensing inquiries, permissions, or partnership opportunities, please contact:

- **Licensing Contact**: Jing Jin
- **Email**: [jingjin@accubitbio.com](mailto:jingjin@accubitbio.com)

