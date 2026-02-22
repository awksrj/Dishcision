# Mobile Sign-In App - Multi-Service Architecture

## Project Structure

This project is organized into three main layers: **Frontend**, **Backend**, and **ML Service**, following a microservices-inspired architecture suitable for scalable applications.

```
src/
├── app/                          # Frontend Layer
│   ├── components/               # React components
│   │   ├── SignInInteractive.tsx # Main sign-in component with backend integration
│   │   └── ui/                   # Shadcn UI components
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   └── useML.ts             # ML service integration hook
│   ├── pages/                    # Page components
│   │   └── SignInPage.tsx       # Sign-in page wrapper
│   ├── store/                    # State management
│   │   └── context.tsx          # React Context for global state
│   └── App.tsx                   # Main app entry point
│
├── backend/                      # Backend Layer
│   ├── api/                      # API client
│   │   └── client.ts            # HTTP client for API requests
│   └── services/                 # Business logic services
│       ├── auth.service.ts      # Authentication service
│       └── user.service.ts      # User management service
│
├── ml-service/                   # ML Service Layer
│   ├── client.ts                # ML service client
│   ├── models/                   # ML models
│   │   └── base.ts              # Base model classes & implementations
│   └── utils/                    # ML utilities
│       └── preprocessing.ts     # Data preprocessing utilities
│
├── imports/                      # Figma imported components
│   ├── SignIn.tsx               # Original Figma design component
│   └── svg-ow3kzxvodw.ts        # SVG assets
│
└── styles/                       # Global styles
    ├── fonts.css
    ├── index.css
    ├── tailwind.css
    └── theme.css
```

## Architecture Overview

### 1. Frontend Layer (`/src/app`)

The frontend is built with React and Tailwind CSS, providing a responsive mobile-first UI.

**Key Components:**
- **SignInInteractive**: Main authentication component with form validation and loading states
- **Custom Hooks**: `useAuth` and `useML` for clean separation of concerns
- **State Management**: React Context for global state (user, authentication, preferences)

**Features:**
- Email validation
- OAuth integration (Google & Apple)
- Loading states and error handling
- Fully interactive UI matching Figma design

### 2. Backend Layer (`/src/backend`)

Mock backend services that simulate API calls for authentication and user management.

**Services:**
- **AuthService**: Handles sign-in, sign-out, and token management
  - Email sign-in
  - OAuth providers (Google, Apple)
  - Token storage and validation
  
- **UserService**: Manages user profiles and preferences
  - Profile retrieval and updates
  - Preference management
  - Account operations

- **API Client**: Centralized HTTP client with authentication support

**Note:** Current implementation uses mock responses. Replace with actual API endpoints by updating the service methods.

### 3. ML Service Layer (`/src/ml-service`)

Machine learning service for predictions, model training, and data preprocessing.

**Components:**
- **ML Client**: Interface for communicating with ML service
  - Single & batch predictions
  - Model training job management
  - Model metrics retrieval

- **Models**: Reusable model classes
  - `ClassificationModel`: Multi-class classification
  - `RegressionModel`: Numerical predictions
  - `SentimentModel`: Text sentiment analysis
  - `RecommendationModel`: Item recommendations

- **Preprocessing Utilities**:
  - Data normalization & standardization
  - One-hot encoding
  - Train/test splitting
  - Feature engineering
  - Correlation analysis

## Usage

### Authentication Flow

```typescript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { signIn, signInWithProvider, isLoading, error } = useAuth();
  
  // Email sign-in
  const handleEmailSignIn = async (email: string) => {
    const success = await signIn(email);
    if (success) {
      // Navigate to dashboard
    }
  };
  
  // OAuth sign-in
  const handleGoogleSignIn = async () => {
    await signInWithProvider('google');
  };
}
```

### ML Service Integration

```typescript
import { useML } from './hooks/useML';

function MyMLComponent() {
  const { predict, trainModel, isProcessing } = useML();
  
  // Make a prediction
  const makePrediction = async () => {
    const result = await predict({
      userId: 'user_123',
      data: { features: [1, 2, 3] },
      modelType: 'classification'
    });
  };
  
  // Train a model
  const startTraining = async () => {
    const job = await trainModel({
      datasetId: 'dataset_123',
      modelType: 'classification'
    });
  };
}
```

### User Management

```typescript
import { userService } from '../backend/services/user.service';

// Get user profile
const profile = await userService.getUserProfile('user_123');

// Update preferences
await userService.updatePreferences('user_123', {
  notifications: true,
  darkMode: false
});
```

## Extending the Application

### Adding New Backend Services

1. Create a new service file in `/src/backend/services/`
2. Define the service interface and methods
3. Use the API client for HTTP requests
4. Create a corresponding React hook in `/src/app/hooks/`

### Adding New ML Models

1. Extend the `BaseModel` class in `/src/ml-service/models/base.ts`
2. Implement the `train()` and `predict()` methods
3. Add model-specific configurations
4. Update the ML service client to support the new model type

### Connecting to Real APIs

Replace mock API calls with actual endpoints:

```typescript
// In auth.service.ts
async signInWithEmail(email: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
}
```

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS v4
- **State Management**: React Context API
- **UI Components**: Custom components + Shadcn UI
- **Icons**: Lucide React
- **Build Tool**: Vite

## Development

The application is designed for easy development and testing:

1. All services use mock data for development
2. Clear separation of concerns for easy testing
3. Type-safe interfaces throughout
4. Modular architecture for easy feature addition

## Next Steps

- Connect to real authentication backend (e.g., Supabase, Auth0, Firebase)
- Implement actual ML model endpoints
- Add routing for multi-page navigation
- Implement persistent storage
- Add unit and integration tests
- Set up CI/CD pipeline
