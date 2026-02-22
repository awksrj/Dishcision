/**
 * Enhanced Sign In Page Component
 * Integrates with backend authentication service
 */

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import SignInUI from '../../imports/SignIn';

export default function SignInPage() {
  const { signIn, signInWithProvider, isLoading, error, validateEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailSignIn = async () => {
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');

    // Call backend auth service
    const success = await signIn(email);
    
    if (success) {
      console.log('Sign in successful!');
      // Navigate to home or dashboard
      // router.push('/home');
    }
  };

  const handleGoogleSignIn = async () => {
    const success = await signInWithProvider('google');
    if (success) {
      console.log('Google sign in successful!');
      // Navigate to home or dashboard
    }
  };

  const handleAppleSignIn = async () => {
    const success = await signInWithProvider('apple');
    if (success) {
      console.log('Apple sign in successful!');
      // Navigate to home or dashboard
    }
  };

  // Use the imported UI component and pass handlers
  return (
    <div className="relative h-screen w-full">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C2D3D] mx-auto mb-4"></div>
            <p className="text-gray-700">Signing in...</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Render the UI component with integration */}
      <SignInUI
        onEmailChange={setEmail}
        onContinue={handleEmailSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onAppleSignIn={handleAppleSignIn}
        emailError={emailError}
        isLoading={isLoading}
      />
    </div>
  );
}
