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

export function formatPValue(p: number): string {
  if (p < 0.001) return 'P < 0.001';
  if (p < 0.01) return `P = ${p.toFixed(3)}`;
  return `P = ${p.toFixed(2)}`;
}

export function computeStatisticalMetric(a: number, b: number, c: number, d: number): StatisticalMetric {
  const { or, ciLower, ciUpper } = calculateOddsRatio(a, b, c, d);
  const pVal = fishersExactTest(a, b, c, d);
  return {
    or: Number(or.toFixed(2)),
    ciLower: Number(ciLower.toFixed(2)),
    ciUpper: Number(ciUpper.toFixed(2)),
    pValue: pVal,
    formattedP: formatPValue(pVal)
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
