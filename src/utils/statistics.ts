import type { StatisticalMetric } from '../types';

// Precomputed log-factorials for fast, precision-safe hypergeometric distribution calculation
const LOG_FACTORIAL_CACHE: number[] = [0, 0];
function getLogFactorial(n: number): number {
  if (n < 0) return 0;
  if (LOG_FACTORIAL_CACHE[n] !== undefined) return LOG_FACTORIAL_CACHE[n];
  let val = LOG_FACTORIAL_CACHE[LOG_FACTORIAL_CACHE.length - 1];
  for (let i = LOG_FACTORIAL_CACHE.length; i <= n; i++) {
    val += Math.log(i);
    LOG_FACTORIAL_CACHE[i] = val;
  }
  return LOG_FACTORIAL_CACHE[n];
}

function logHypergeometricProb(a: number, b: number, c: number, d: number): number {
  const n = a + b + c + d;
  return (
    getLogFactorial(a + b) +
    getLogFactorial(c + d) +
    getLogFactorial(a + c) +
    getLogFactorial(b + d) -
    getLogFactorial(n) -
    getLogFactorial(a) -
    getLogFactorial(b) -
    getLogFactorial(c) -
    getLogFactorial(d)
  );
}

// Two-sided Fisher's Exact Test
export function fishersExactTest(a: number, b: number, c: number, d: number): number {
  const n = a + b + c + d;
  if (n === 0) return 1.0;

  const row1 = a + b;
  const col1 = a + c;

  const obsProb = Math.exp(logHypergeometricProb(a, b, c, d));
  let pVal = 0;

  const minA = Math.max(0, row1 - d - b);
  const maxA = Math.min(row1, col1);

  for (let x = minA; x <= maxA; x++) {
    const curA = x;
    const curB = row1 - x;
    const curC = col1 - x;
    const curD = n - curA - curB - curC;

    const prob = Math.exp(logHypergeometricProb(curA, curB, curC, curD));
    // Cumulative probability for two-sided test: <= observed probability (with small epsilon for floating-point tolerance)
    if (prob <= obsProb * (1 + 1e-9)) {
      pVal += prob;
    }
  }

  return Math.min(1.0, Math.max(0.0, pVal));
}

// Odds Ratio and 95% Confidence Interval (Woolf logit with Haldane-Anscombe correction if zero present)
export function calculateOddsRatio(a: number, b: number, c: number, d: number): { or: number; ciLower: number; ciUpper: number } {
  // If row or column marginal totals are zero, the odds ratio is undefined / not applicable
  if (a + b === 0 || c + d === 0 || a + c === 0 || b + d === 0) {
    return { or: NaN, ciLower: NaN, ciUpper: NaN };
  }

  let a_ = a;
  let b_ = b;
  let c_ = c;
  let d_ = d;

  const hasZero = a === 0 || b === 0 || c === 0 || d === 0;
  if (hasZero) {
    a_ += 0.5;
    b_ += 0.5;
    c_ += 0.5;
    d_ += 0.5;
  }

  const or = (a_ * d_) / (b_ * c_);
  const se = Math.sqrt(1 / a_ + 1 / b_ + 1 / c_ + 1 / d_);
  const logOr = Math.log(or);

  const ciLower = Math.exp(logOr - 1.96 * se);
  const ciUpper = Math.exp(logOr + 1.96 * se);

  return { or, ciLower, ciUpper };
}

/**
 * Fast binomial random variate generator.
 * Combines exact Bernoulli trials for n <= 60, Poisson approximation when rare events (np <= 10 or n(1-p) <= 10),
 * and Box-Muller Gaussian approximation for larger sample sizes.
 */
function sampleBinomial(n: number, p: number): number {
  if (n <= 0 || p <= 0) return 0;
  if (p >= 1) return n;

  if (n <= 60) {
    let successes = 0;
    for (let i = 0; i < n; i++) {
      if (Math.random() < p) successes++;
    }
    return successes;
  }

  const np = n * p;
  const nq = n * (1 - p);

  if (np <= 10) {
    const L = Math.exp(-np);
    let k = 0;
    let pProd = 1;
    do {
      k++;
      pProd *= Math.random();
    } while (pProd > L);
    return Math.min(n, k - 1);
  }

  if (nq <= 10) {
    const L = Math.exp(-nq);
    let k = 0;
    let pProd = 1;
    do {
      k++;
      pProd *= Math.random();
    } while (pProd > L);
    return Math.max(0, n - (k - 1));
  }

  const u1 = Math.max(1e-15, Math.random());
  const u2 = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  const sample = Math.round(np + Math.sqrt(np * (1 - p)) * z);
  return Math.max(0, Math.min(n, sample));
}

/**
 * Monte Carlo Bootstrapped Odds Ratio Confidence Interval.
 * When contingency table counts are small (cell count <= 5), the Woolf logit normal
 * approximation suffers from severe small-sample bias.
 * This function performs parametric bootstrap resampling from two independent
 * binomial distributions Bin(n1, p1) and Bin(n2, p2) for B iterations,
 * deriving empirical 2.5% and 97.5% percentile confidence limits.
 *
 * @param a Group 1 positive
 * @param b Group 1 negative
 * @param c Group 2 positive
 * @param d Group 2 negative
 * @param iterations Number of bootstrap replicates (default 10,000)
 */
export function calculateBootstrappedOddsRatio(
  a: number,
  b: number,
  c: number,
  d: number,
  iterations: number = 10000
): { or: number; ciLower: number; ciUpper: number; bootstrapIterations: number } {
  const n1 = a + b;
  const n2 = c + d;

  if (n1 === 0 || n2 === 0) {
    return { or: NaN, ciLower: NaN, ciUpper: NaN, bootstrapIterations: iterations };
  }

  // Point estimate: Haldane-Anscombe if zero cell present, else standard (a*d)/(b*c)
  const hasZero = a === 0 || b === 0 || c === 0 || d === 0;
  const pointOr = hasZero
    ? ((a + 0.5) * (d + 0.5)) / ((b + 0.5) * (c + 0.5))
    : (a * d) / (b * c);

  // Maximum likelihood / Laplace-smoothed proportions
  const p1 = (a + 0.5) / (n1 + 1.0);
  const p2 = (c + 0.5) / (n2 + 1.0);

  const boots = new Float64Array(iterations);

  for (let i = 0; i < iterations; i++) {
    const aStar = sampleBinomial(n1, p1);
    const bStar = n1 - aStar;
    const cStar = sampleBinomial(n2, p2);
    const dStar = n2 - cStar;

    // Standard 0.5 smoothing for odds ratio during bootstrap draws
    const orStar = ((aStar + 0.5) * (dStar + 0.5)) / ((bStar + 0.5) * (cStar + 0.5));
    boots[i] = orStar;
  }

  boots.sort();

  const lowerIdx = Math.floor(iterations * 0.025);
  const upperIdx = Math.floor(iterations * 0.975);

  const ciLower = boots[lowerIdx];
  const ciUpper = boots[upperIdx];

  return {
    or: pointOr,
    ciLower,
    ciUpper,
    bootstrapIterations: iterations
  };
}

export function formatPValue(p: number): string {
  if (isNaN(p)) return 'N/A';
  if (p < 0.001) return 'P < 0.001';
  if (p < 0.01) return `P = ${p.toFixed(3)}`;
  return `P = ${p.toFixed(2)}`;
}

export function computeStatisticalMetric(a: number, b: number, c: number, d: number): StatisticalMetric {
  // If row or column marginal totals are zero, the odds ratio is undefined / not applicable
  if (a + b === 0 || c + d === 0 || a + c === 0 || b + d === 0) {
    return {
      or: NaN,
      ciLower: NaN,
      ciUpper: NaN,
      pValue: NaN,
      formattedP: 'N/A'
    };
  }

  const pVal = fishersExactTest(a, b, c, d);
  const minCell = Math.min(a, b, c, d);

  // For small cell frequencies (<= 5), Woolf logit approximation fails asymptotic normality.
  // We use Monte Carlo Bootstrapped Percentile Confidence Intervals (B = 10,000) for robust estimation.
  if (minCell <= 5) {
    const boot = calculateBootstrappedOddsRatio(a, b, c, d, 10000);
    return {
      or: Number(boot.or.toFixed(2)),
      ciLower: Number(boot.ciLower.toFixed(2)),
      ciUpper: Number(boot.ciUpper.toFixed(2)),
      pValue: pVal,
      formattedP: formatPValue(pVal),
      isBootstrapped: true,
      bootstrapIterations: boot.bootstrapIterations
    };
  }

  const { or, ciLower, ciUpper } = calculateOddsRatio(a, b, c, d);
  return {
    or: Number(or.toFixed(2)),
    ciLower: Number(ciLower.toFixed(2)),
    ciUpper: Number(ciUpper.toFixed(2)),
    pValue: pVal,
    formattedP: formatPValue(pVal),
    isBootstrapped: false
  };
}

// Standard Lanczos approximation for log-gamma function ln(Gamma(z)) for any z > 0
export function logGamma(z: number): number {
  if (z <= 0) return 0;
  // Coefficients for g=7, N=9 Lanczos approximation
  const p = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  const g = 7;
  let x = p[0];
  for (let i = 1; i < 9; i++) {
    x += p[i] / (z + i - 1);
  }
  const t = z + g - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z - 0.5) * Math.log(t) - t + Math.log(x);
}

/**
 * Lower incomplete gamma function P(a, x) = gamma(a, x) / Gamma(a)
 * Numerically stable for all x >= 0 and a > 0.
 * In particular, when x < a + 1, computed directly via series expansion without
 * subtractive cancellation from 1.0, preserving full double precision (~1e-15).
 */
export function gammaLowerIncomplete(a: number, x: number): number {
  if (x <= 0) return 0.0;
  if (a <= 0) return 1.0;

  if (x < a + 1) {
    // Series expansion for lower incomplete gamma P(a, x)
    let sum = 1.0 / a;
    let term = 1.0 / a;
    for (let n = 1; n < 200; n++) {
      term *= x / (a + n);
      sum += term;
      if (term < sum * 1e-15) break;
    }
    const logP = a * Math.log(x) - x - logGamma(a) + Math.log(sum);
    if (logP < -700) return 0.0;
    return Math.min(1.0, Math.max(0.0, Math.exp(logP)));
  } else {
    // Continued fraction for Q(a, x) (Lentz's method)
    const TINY = 1e-30;
    let b = x + 1.0 - a;
    let c = 1.0 / TINY;
    let d = 1.0 / b;
    let h = d;
    for (let i = 1; i <= 200; i++) {
      const an = -i * (i - a);
      b += 2.0;
      d = an * d + b;
      if (Math.abs(d) < TINY) d = TINY;
      c = b + an / c;
      if (Math.abs(c) < TINY) c = TINY;
      d = 1.0 / d;
      const delta = d * c;
      h *= delta;
      if (Math.abs(delta - 1.0) < 1e-15) break;
    }
    const logQ = a * Math.log(x) - x - logGamma(a) + Math.log(h);
    if (logQ < -700) return 1.0;
    return Math.min(1.0, Math.max(0.0, 1.0 - Math.exp(logQ)));
  }
}

// Upper incomplete gamma function Q(a, x) = 1 - P(a, x) = Gamma(a, x) / Gamma(a)
// Numerically stable for all x >= 0 and a > 0 using series representation (x < a + 1)
// or Legendre continued fraction (x >= a + 1).
export function gammaUpperIncomplete(a: number, x: number): number {
  if (x <= 0) return 1.0;
  if (a <= 0) return 0.0;

  if (x < a + 1) {
    // Series expansion for lower incomplete gamma P(a, x)
    let sum = 1.0 / a;
    let term = 1.0 / a;
    for (let n = 1; n < 200; n++) {
      term *= x / (a + n);
      sum += term;
      if (term < sum * 1e-15) break;
    }
    const logP = a * Math.log(x) - x - logGamma(a) + Math.log(sum);
    return Math.max(0.0, 1.0 - Math.exp(logP));
  } else {
    // Continued fraction for Q(a, x) (Lentz's method)
    const TINY = 1e-30;
    let b = x + 1.0 - a;
    let c = 1.0 / TINY;
    let d = 1.0 / b;
    let h = d;
    for (let i = 1; i <= 200; i++) {
      const an = -i * (i - a);
      b += 2.0;
      d = an * d + b;
      if (Math.abs(d) < TINY) d = TINY;
      c = b + an / c;
      if (Math.abs(c) < TINY) c = TINY;
      d = 1.0 / d;
      const delta = d * c;
      h *= delta;
      if (Math.abs(delta - 1.0) < 1e-15) break;
    }
    const logQ = a * Math.log(x) - x - logGamma(a) + Math.log(h);
    return Math.min(1.0, Math.max(0.0, Math.exp(logQ)));
  }
}

// Chi-Square Goodness-of-Fit test for Proline codons vs Kazusa genome-wide usage
export function chiSquareGoodnessOfFit(
  observed: number[],
  expectedProportions: number[]
): { chi2: number; pValue: number; df: number; formattedP: string } {
  const totalObs = observed.reduce((acc, v) => acc + v, 0);
  if (totalObs === 0) return { chi2: 0, pValue: 1, df: observed.length - 1, formattedP: 'P = 1.00' };

  let chi2 = 0;
  for (let i = 0; i < observed.length; i++) {
    const exp = totalObs * expectedProportions[i];
    if (exp > 0) {
      chi2 += Math.pow(observed[i] - exp, 2) / exp;
    }
  }

  const df = observed.length - 1;
  // P-value = 1 - Chi2CDF(chi2, df) = Q(df / 2, chi2 / 2)
  const pVal = gammaUpperIncomplete(df / 2, chi2 / 2);

  return {
    chi2: Number(chi2.toFixed(1)),
    pValue: pVal,
    df,
    formattedP: formatPValue(pVal)
  };
}

// === Multiple Testing Correction (FDR & Bonferroni) ===

/**
 * Benjamini-Hochberg (BH) procedure to control False Discovery Rate (FDR).
 * Takes an array of nominal p-values and returns monotonically adjusted q-values.
 */
export function adjustPValuesBH(pValues: number[]): number[] {
  const n = pValues.length;
  if (n === 0) return [];
  if (n === 1) return [Math.min(1.0, Math.max(0.0, pValues[0]))];

  const indexed = pValues.map((p, idx) => ({ p: isNaN(p) ? 1.0 : p, idx }));
  indexed.sort((a, b) => a.p - b.p);

  const qValues = new Array<number>(n);
  let cumMin = 1.0;

  // Backward pass to enforce monotonicity: q_i = min(q_{i+1}, p_i * n / rank)
  for (let i = n - 1; i >= 0; i--) {
    const rank = i + 1;
    const rawQ = (indexed[i].p * n) / rank;
    cumMin = Math.min(cumMin, Math.min(1.0, Math.max(0.0, rawQ)));
    qValues[indexed[i].idx] = Number(cumMin.toFixed(4));
  }

  return qValues;
}

/**
 * Bonferroni Family-Wise Error Rate (FWER) correction.
 * p_adj = min(1.0, p * n)
 */
export function adjustPValuesBonferroni(pValues: number[]): number[] {
  const n = pValues.length;
  return pValues.map(p => {
    if (isNaN(p)) return 1.0;
    return Number(Math.min(1.0, Math.max(0.0, p * n)).toFixed(4));
  });
}

/**
 * Exact, numerically stable Poisson tail probability P(X >= k | lambda).
 * Strictly equals the regularized lower incomplete gamma function P(k, lambda) = 1 - Q(k, lambda).
 * Eliminates step truncation error and log-underflow across arbitrary (k, lambda) parameter space.
 */
export function accuratePoissonPValue(k: number, lambda: number): number {
  if (k <= 0) return 1.0;
  if (lambda <= 0) return 0.0;
  return gammaLowerIncomplete(k, lambda);
}

/**
 * Format FDR adjusted q-value for clean UI reporting.
 */
export function formatQValue(q: number): string {
  if (isNaN(q)) return 'N/A';
  if (q < 0.001) return 'q < 0.001';
  if (q < 0.01) return `q = ${q.toFixed(3)}`;
  return `q = ${q.toFixed(3)}`;
}

