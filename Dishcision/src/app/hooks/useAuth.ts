/**
 * Custom React Hooks for Authentication
 */

import { useState, useCallback } from 'react';
import { authService, AuthResponse } from '../../backend/services/auth.service';
import { useAppState, actions } from '../store/context';

export function useAuth() {
  const { state, dispatch } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(
    async (email: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      dispatch(actions.setLoading(true));

      try {
        const response: AuthResponse = await authService.signInWithEmail(email);

        if (response.success && response.user) {
          dispatch(actions.setUser(response.user));
          setIsLoading(false);
          return true;
        } else {
          const errorMsg = response.error || 'Sign in failed';
          setError(errorMsg);
          dispatch(actions.setError(errorMsg));
          setIsLoading(false);
          return false;
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMsg);
        dispatch(actions.setError(errorMsg));
        setIsLoading(false);
        return false;
      }
    },
    [dispatch]
  );

  const signInWithProvider = useCallback(
    async (provider: 'google' | 'apple'): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      dispatch(actions.setLoading(true));

      try {
        const response: AuthResponse = await authService.signInWithProvider(provider);

        if (response.success && response.user) {
          dispatch(actions.setUser(response.user));
          setIsLoading(false);
          return true;
        } else {
          const errorMsg = response.error || `Sign in with ${provider} failed`;
          setError(errorMsg);
          dispatch(actions.setError(errorMsg));
          setIsLoading(false);
          return false;
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMsg);
        dispatch(actions.setError(errorMsg));
        setIsLoading(false);
        return false;
      }
    },
    [dispatch]
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      dispatch(actions.clearUser());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const validateEmail = useCallback((email: string): boolean => {
    return authService.validateEmail(email);
  }, []);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading,
    error,
    signIn,
    signInWithProvider,
    signOut,
    validateEmail,
  };
}
