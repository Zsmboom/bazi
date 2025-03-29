'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

// Component using useSearchParams
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get error information from URL
  useEffect(() => {
    const errorType = searchParams.get('error');
    if (errorType) {
      const errorMessages: {[key: string]: string} = {
        'OAuthSignin': 'Failed to connect to Google services. Please check your network.',
        'OAuthCallback': 'Failed to get user information from Google. Please check your network.',
        'no_code': 'Failed to get authorization code',
        'auth_failed': 'Authentication failed. Please try again.',
        'callback_error': 'An error occurred during the authentication process'
      };
      
      setError(errorMessages[errorType] || 'An error occurred during login');
    }
  }, [searchParams]);

  // If user is logged in, redirect to home page
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/');
    }
  }, [session, status, router]);

  // Standard Google login with NextAuth
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn('google', { 
        callbackUrl: '/',
        redirect: true,
      });
    } catch (err) {
      console.error('NextAuth login error:', err);
      setError('An error occurred during login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-light dark:bg-ink-dark py-12 relative ink-wash-bg">
        <div className="ink-splash ink-splash-1"></div>
        <div className="ink-splash ink-splash-2"></div>
        <div className="ink-splash ink-splash-3"></div>
        <div className="max-w-md w-full p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-earth mx-auto"></div>
            <p className="mt-4 text-earth dark:text-earth">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-light dark:bg-ink-dark py-12 relative ink-wash-bg">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="absolute top-20 right-10 w-40 h-40 bagua-symbol opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bagua-symbol opacity-20"></div>
      
      <div className="max-w-md w-full p-8 relative z-10 ink-card">
        <div className="text-center mb-8">
          <div className="bagua-symbol mx-auto"></div>
          <h1 className="text-3xl font-bold text-earth dark:text-earth mt-4 ink-text">Login</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Login to access personalized destiny analysis and more features
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 rounded-md bg-fire/10 text-fire text-center">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-ink-dark hover:bg-gray-50 dark:hover:bg-ink-dark/80 transition-colors"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-700 dark:border-gray-300 mr-2"></div>
            ) : (
              <FcGoogle className="w-5 h-5 mr-2" />
            )}
            Sign in with Google
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-fire hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback UI
function LoadingLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-light dark:bg-ink-dark py-12 relative ink-wash-bg">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="max-w-md w-full p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="bagua-symbol mx-auto"></div>
          <h1 className="text-3xl font-bold text-earth dark:text-earth mt-4 ink-text">Login</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-earth mx-auto mt-6"></div>
          <p className="mt-4 text-earth dark:text-earth">Loading login options...</p>
        </div>
      </div>
    </div>
  );
}

// Main page component wrapped with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingLogin />}>
      <LoginContent />
    </Suspense>
  );
} 