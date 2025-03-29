/**
 * Google Authentication Proxy Utility
 * Used for authentication with Google OAuth service
 */
import { useState, useCallback } from 'react';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Create custom Google authorization URL
   */
  const getGoogleAuthUrl = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError('Missing Google client ID configuration');
      return null;
    }
    
    // Create random state value to prevent CSRF attacks
    const state = Math.random().toString(36).substring(2, 15);
    // Save to localStorage for verification
    localStorage.setItem('googleAuthState', state);
    
    // Create redirect URI
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/google-callback`);
    
    // Build authorization URL
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&prompt=consent&access_type=offline&state=${state}`;
  }, []);

  /**
   * Process authorization code and get token
   */
  const handleGoogleAuthCode = useCallback(async (code: string, state: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate state value to prevent CSRF attacks
      const savedState = localStorage.getItem('googleAuthState');
      if (savedState !== state) {
        throw new Error('State validation failed, potential security risk');
      }
      
      // Clear state
      localStorage.removeItem('googleAuthState');
      
      // Send authorization code to backend API to get token
      const response = await fetch('/api/auth/exchange-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Token exchange failed');
      }
      
      const data = await response.json();
      
      // Store tokens
      localStorage.setItem('googleAccessToken', data.accessToken);
      localStorage.setItem('googleIdToken', data.idToken);
      
      // Get user information
      const userResponse = await fetch('/api/auth/user-info', {
        headers: {
          'Authorization': `Bearer ${data.accessToken}`,
        },
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to get user information');
      }
      
      const userData = await userResponse.json();
      
      // Store user information
      localStorage.setItem('googleUser', JSON.stringify(userData));
      
      // Return user data
      return userData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error during authentication process');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Check if user is logged in
   */
  const checkLoggedIn = useCallback(() => {
    const token = localStorage.getItem('googleAccessToken');
    const user = localStorage.getItem('googleUser');
    return token && user ? JSON.parse(user) : null;
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(() => {
    localStorage.removeItem('googleAccessToken');
    localStorage.removeItem('googleIdToken');
    localStorage.removeItem('googleUser');
    localStorage.removeItem('googleAuthState');
  }, []);

  return {
    loading,
    error,
    getGoogleAuthUrl,
    handleGoogleAuthCode,
    checkLoggedIn,
    logout,
  };
}; 