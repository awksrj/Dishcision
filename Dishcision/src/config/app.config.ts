/**
 * Application Configuration
 * Central configuration for backend, frontend, and ML service
 */

export const config = {
  // Backend API Configuration
  backend: {
    apiUrl: process.env.REACT_APP_API_URL || '/api',
    authUrl: process.env.REACT_APP_AUTH_URL || '/api/auth',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
  },

  // ML Service Configuration
  mlService: {
    apiUrl: process.env.REACT_APP_ML_API_URL || '/api/ml',
    timeout: 60000, // 60 seconds for ML operations
    maxBatchSize: 100,
    modelVersions: {
      classification: 'v1.2.3',
      regression: 'v1.1.0',
      sentiment: 'v2.0.1',
      recommendation: 'v1.3.0',
    },
  },

  // Frontend Configuration
  frontend: {
    appName: 'Mobile Sign-In App',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    enableDebugMode: process.env.NODE_ENV === 'development',
  },

  // Authentication Configuration
  auth: {
    tokenKey: 'auth_token',
    tokenExpiry: 3600000, // 1 hour in milliseconds
    refreshTokenKey: 'refresh_token',
    providers: {
      email: true,
      google: true,
      apple: true,
    },
  },

  // Feature Flags
  features: {
    enableMLPredictions: true,
    enableBatchProcessing: true,
    enableRealTimeUpdates: false,
    enablePushNotifications: false,
  },

  // API Endpoints
  endpoints: {
    // Auth endpoints
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    signUp: '/auth/signup',
    refreshToken: '/auth/refresh',
    
    // User endpoints
    userProfile: '/users/:id',
    updateProfile: '/users/:id',
    userPreferences: '/users/:id/preferences',
    
    // ML endpoints
    predict: '/ml/predict',
    batchPredict: '/ml/batch-predict',
    trainModel: '/ml/train',
    modelStatus: '/ml/status/:jobId',
    modelMetrics: '/ml/metrics/:modelId',
  },

  // UI Configuration
  ui: {
    theme: {
      primary: '#702632',
      secondary: '#40434e',
      background: '#fffffa',
      text: '#000000',
      error: '#ef4444',
      success: '#10b981',
      warning: '#f59e0b',
    },
    animation: {
      duration: 300, // milliseconds
      easing: 'ease-in-out',
    },
    breakpoints: {
      mobile: 375,
      tablet: 768,
      desktop: 1024,
    },
  },

  // Validation Rules
  validation: {
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maxLength: 255,
    },
    password: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
    },
  },

  // Logging Configuration
  logging: {
    level: process.env.REACT_APP_LOG_LEVEL || 'info',
    enableConsole: true,
    enableRemote: process.env.NODE_ENV === 'production',
  },
};

export default config;
