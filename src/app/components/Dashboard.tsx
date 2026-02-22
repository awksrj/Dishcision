/**
 * Example Dashboard Component
 * Demonstrates integration of Frontend, Backend, and ML Service layers
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useML } from '../hooks/useML';
import { userService, UserProfile } from '../../backend/services/user.service';

export default function Dashboard() {
  const { user, isAuthenticated, signOut } = useAuth();
  const { predict, lastPrediction, isProcessing } = useML();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [predictionResult, setPredictionResult] = useState<string>('');

  // Load user profile on mount
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    const userProfile = await userService.getUserProfile(user.id);
    setProfile(userProfile);
  };

  const handleMakePrediction = async () => {
    if (!user) return;

    const result = await predict({
      userId: user.id,
      data: { features: [Math.random(), Math.random(), Math.random()] },
      modelType: 'classification',
    });

    if (result) {
      setPredictionResult(JSON.stringify(result.prediction, null, 2));
    }
  };

  const handleSignOut = async () => {
    await signOut();
    // Redirect to sign-in page
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#40434e]">
        <p className="text-white text-lg">Please sign in to continue</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#40434e] text-white p-6">
      {/* Header */}
      <div className="bg-[#702632] rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm opacity-80 mt-1">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-white text-[#702632] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Profile Section (Backend) */}
        <div className="bg-white text-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">User Profile</h2>
          {profile ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Logins</p>
                <p className="font-medium">{profile.stats.totalLogins}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Age</p>
                <p className="font-medium">{profile.stats.accountAge} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Preferences</p>
                <div className="flex gap-2 mt-1">
                  <span className="px-2 py-1 bg-[#702632] text-white text-xs rounded">
                    {profile.preferences.theme}
                  </span>
                  <span className="px-2 py-1 bg-[#702632] text-white text-xs rounded">
                    {profile.preferences.language}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Loading profile...</p>
          )}
        </div>

        {/* ML Predictions Section (ML Service) */}
        <div className="bg-white text-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">ML Predictions</h2>
          <button
            onClick={handleMakePrediction}
            disabled={isProcessing}
            className="w-full bg-[#702632] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#8a3040] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isProcessing ? 'Processing...' : 'Run ML Prediction'}
          </button>

          {lastPrediction && (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Confidence</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#702632] h-2 rounded-full transition-all"
                      style={{ width: `${lastPrediction.confidence * 100}%` }}
                    />
                  </div>
                  <span className="font-medium">
                    {(lastPrediction.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Model Version</p>
                <p className="font-medium">{lastPrediction.modelVersion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Result</p>
                <pre className="bg-gray-100 p-3 rounded mt-1 text-xs overflow-auto">
                  {predictionResult}
                </pre>
              </div>
            </div>
          )}

          {!lastPrediction && !isProcessing && (
            <p className="text-gray-600 text-center py-8">
              Click the button to run a prediction
            </p>
          )}
        </div>

        {/* System Info Section */}
        <div className="bg-white text-gray-900 rounded-lg p-6 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">System Architecture</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border-2 border-[#702632] rounded-lg p-4">
              <h3 className="font-bold text-[#702632] mb-2">Frontend Layer</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Context API State</li>
                <li>• Custom Hooks</li>
              </ul>
            </div>
            <div className="border-2 border-[#702632] rounded-lg p-4">
              <h3 className="font-bold text-[#702632] mb-2">Backend Layer</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Auth Service</li>
                <li>• User Service</li>
                <li>• API Client</li>
                <li>• Token Management</li>
              </ul>
            </div>
            <div className="border-2 border-[#702632] rounded-lg p-4">
              <h3 className="font-bold text-[#702632] mb-2">ML Service Layer</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Classification</li>
                <li>• Regression</li>
                <li>• Sentiment Analysis</li>
                <li>• Recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
