/**
 * Custom React Hook for ML Service Integration
 */

import { useState, useCallback } from 'react';
import {
  mlServiceClient,
  PredictionRequest,
  PredictionResponse,
  TrainingRequest,
  TrainingResponse,
  ModelMetrics,
} from '../../ml-service/client';

export function useML() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrediction, setLastPrediction] = useState<PredictionResponse | null>(null);

  const predict = useCallback(async (request: PredictionRequest): Promise<PredictionResponse | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await mlServiceClient.predict(request);
      setLastPrediction(response);
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Prediction failed';
      setError(errorMsg);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const batchPredict = useCallback(
    async (requests: PredictionRequest[]): Promise<PredictionResponse[] | null> => {
      setIsProcessing(true);
      setError(null);

      try {
        const responses = await mlServiceClient.batchPredict(requests);
        return responses;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Batch prediction failed';
        setError(errorMsg);
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const trainModel = useCallback(async (request: TrainingRequest): Promise<TrainingResponse | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await mlServiceClient.trainModel(request);
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Model training failed';
      setError(errorMsg);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const getTrainingStatus = useCallback(async (jobId: string): Promise<TrainingResponse | null> => {
    setError(null);

    try {
      const status = await mlServiceClient.getTrainingStatus(jobId);
      return status;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to get training status';
      setError(errorMsg);
      return null;
    }
  }, []);

  const getModelMetrics = useCallback(async (modelId: string): Promise<ModelMetrics | null> => {
    setError(null);

    try {
      const metrics = await mlServiceClient.getModelMetrics(modelId);
      return metrics;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to get model metrics';
      setError(errorMsg);
      return null;
    }
  }, []);

  return {
    predict,
    batchPredict,
    trainModel,
    getTrainingStatus,
    getModelMetrics,
    isProcessing,
    error,
    lastPrediction,
  };
}
