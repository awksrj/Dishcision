/**
 * Data Processing Utilities
 * Preprocessing and feature engineering for ML models
 */

export interface ProcessedData {
  features: number[][];
  labels?: any[];
  metadata?: Record<string, any>;
}

/**
 * Normalize numerical data to 0-1 range
 */
export function normalize(data: number[][]): number[][] {
  const min = Math.min(...data.flat());
  const max = Math.max(...data.flat());
  const range = max - min;

  return data.map((row) => row.map((val) => (val - min) / range));
}

/**
 * Standardize data (z-score normalization)
 */
export function standardize(data: number[][]): number[][] {
  const flat = data.flat();
  const mean = flat.reduce((a, b) => a + b, 0) / flat.length;
  const variance =
    flat.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / flat.length;
  const std = Math.sqrt(variance);

  return data.map((row) => row.map((val) => (val - mean) / std));
}

/**
 * One-hot encode categorical variables
 */
export function oneHotEncode(labels: string[]): number[][] {
  const uniqueLabels = Array.from(new Set(labels));
  return labels.map((label) => {
    const encoded = new Array(uniqueLabels.length).fill(0);
    encoded[uniqueLabels.indexOf(label)] = 1;
    return encoded;
  });
}

/**
 * Split data into train/test sets
 */
export function trainTestSplit<T>(
  data: T[],
  testSize: number = 0.2
): { train: T[]; test: T[] } {
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  const splitIndex = Math.floor(data.length * (1 - testSize));

  return {
    train: shuffled.slice(0, splitIndex),
    test: shuffled.slice(splitIndex),
  };
}

/**
 * Handle missing values
 */
export function fillMissing(
  data: (number | null)[][],
  strategy: 'mean' | 'median' | 'zero' = 'mean'
): number[][] {
  return data.map((row) => {
    return row.map((val, idx) => {
      if (val === null || val === undefined || isNaN(val)) {
        switch (strategy) {
          case 'mean':
            const colValues = data.map((r) => r[idx]).filter((v) => v !== null) as number[];
            return colValues.reduce((a, b) => a + b, 0) / colValues.length;
          case 'median':
            const sorted = data
              .map((r) => r[idx])
              .filter((v) => v !== null)
              .sort((a, b) => (a as number) - (b as number)) as number[];
            return sorted[Math.floor(sorted.length / 2)];
          case 'zero':
          default:
            return 0;
        }
      }
      return val;
    });
  });
}

/**
 * Feature scaling using Min-Max
 */
export function minMaxScale(
  data: number[][],
  featureRange: [number, number] = [0, 1]
): number[][] {
  const [minRange, maxRange] = featureRange;
  const numFeatures = data[0].length;

  const mins = Array(numFeatures).fill(Infinity);
  const maxs = Array(numFeatures).fill(-Infinity);

  // Find min and max for each feature
  data.forEach((row) => {
    row.forEach((val, idx) => {
      mins[idx] = Math.min(mins[idx], val);
      maxs[idx] = Math.max(maxs[idx], val);
    });
  });

  // Scale data
  return data.map((row) =>
    row.map((val, idx) => {
      const range = maxs[idx] - mins[idx];
      if (range === 0) return minRange;
      return ((val - mins[idx]) / range) * (maxRange - minRange) + minRange;
    })
  );
}

/**
 * Create polynomial features
 */
export function polynomialFeatures(data: number[][], degree: number = 2): number[][] {
  return data.map((row) => {
    const features = [...row];
    for (let d = 2; d <= degree; d++) {
      row.forEach((val) => {
        features.push(Math.pow(val, d));
      });
    }
    return features;
  });
}

/**
 * Calculate correlation matrix
 */
export function correlationMatrix(data: number[][]): number[][] {
  const numFeatures = data[0].length;
  const matrix: number[][] = Array(numFeatures)
    .fill(0)
    .map(() => Array(numFeatures).fill(0));

  for (let i = 0; i < numFeatures; i++) {
    for (let j = 0; j < numFeatures; j++) {
      const col1 = data.map((row) => row[i]);
      const col2 = data.map((row) => row[j]);
      matrix[i][j] = pearsonCorrelation(col1, col2);
    }
  }

  return matrix;
}

/**
 * Pearson correlation coefficient
 */
function pearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const sum1 = x.reduce((a, b) => a + b);
  const sum2 = y.reduce((a, b) => a + b);
  const sum1Sq = x.reduce((sum, val) => sum + val * val, 0);
  const sum2Sq = y.reduce((sum, val) => sum + val * val, 0);
  const pSum = x.reduce((sum, val, i) => sum + val * y[i], 0);

  const num = pSum - (sum1 * sum2) / n;
  const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));

  return den === 0 ? 0 : num / den;
}
