'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleAuth } from '../../../utils/googleAuthProxy';

// Component that uses useSearchParams
function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleGoogleAuthCode, loading, error } = useGoogleAuth();
  const [processingStatus, setProcessingStatus] = useState('Processing...');

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Get authorization code and state
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code) {
          setProcessingStatus('Authorization code not found, authentication failed');
          setTimeout(() => router.push('/login?error=no_code'), 3000);
          return;
        }

        // Process authorization code
        setProcessingStatus('Communicating with Google servers...');
        const userData = await handleGoogleAuthCode(code, state || '');

        if (userData) {
          setProcessingStatus('Login successful! Redirecting...');
          // Login successful, redirect to homepage
          setTimeout(() => router.push('/'), 1500);
        } else {
          setProcessingStatus('Login failed, please try again');
          // Login failed, redirect to login page
          setTimeout(() => router.push('/login?error=auth_failed'), 3000);
        }
      } catch (err) {
        console.error('Error processing OAuth callback:', err);
        setProcessingStatus('Error occurred during authorization');
        setTimeout(() => router.push('/login?error=callback_error'), 3000);
      }
    };

    processAuth();
  }, [searchParams, handleGoogleAuthCode, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-light dark:bg-ink-dark py-12 relative ink-wash-bg">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="max-w-md w-full p-8 relative z-10 ink-card">
        <div className="text-center mb-8">
          <div className="bagua-symbol mx-auto"></div>
          <h1 className="text-2xl font-bold text-earth dark:text-earth mt-4 ink-text">Google account login</h1>
          <div className="mt-6">
            {loading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-earth mx-auto"></div>
            ) : error ? (
              <div className="text-fire">{error}</div>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300">{processingStatus}</p>
                <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-earth animate-pulse rounded-full"></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback UI
function LoadingCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-light dark:bg-ink-dark py-12 relative ink-wash-bg">
      <div className="max-w-md w-full p-8 relative z-10 ink-card">
        <div className="text-center mb-8">
          <div className="bagua-symbol mx-auto"></div>
          <h1 className="text-2xl font-bold text-earth dark:text-earth mt-4 ink-text">Google account login</h1>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-earth mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-300 mt-4">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component using Suspense
export default function GoogleAuthCallback() {
  return (
    <Suspense fallback={<LoadingCallback />}>
      <CallbackContent />
    </Suspense>
  );
} 