/**
 * Frontend State Management
 * Centralized state management using React Context
 */

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User } from '../../backend/services/auth.service';

// State types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'RESET_STATE' };

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'en',
  },
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}

// Action creators (helper functions)
export const actions = {
  setUser: (user: User): AppAction => ({ type: 'SET_USER', payload: user }),
  clearUser: (): AppAction => ({ type: 'CLEAR_USER' }),
  setLoading: (loading: boolean): AppAction => ({ type: 'SET_LOADING', payload: loading }),
  setError: (error: string | null): AppAction => ({ type: 'SET_ERROR', payload: error }),
  updatePreferences: (preferences: Partial<UserPreferences>): AppAction => ({
    type: 'UPDATE_PREFERENCES',
    payload: preferences,
  }),
  resetState: (): AppAction => ({ type: 'RESET_STATE' }),
};
