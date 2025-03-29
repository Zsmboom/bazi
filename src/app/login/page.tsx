'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleAuth } from '../../utils/googleAuthProxy';
import { getMockAuthUrl, checkMockLoggedIn } from '../../utils/mockAuthService';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authUrl, setAuthUrl] = useState('');
  const [mockAuthUrl, setMockAuthUrl] = useState('');
  
  // 使用自定义Google认证
  const { 
    getGoogleAuthUrl, 
    checkLoggedIn,
    loading: googleAuthLoading 
  } = useGoogleAuth();

  // 获取URL中的错误信息
  useEffect(() => {
    const errorType = searchParams.get('error');
    if (errorType) {
      const errorMessages: {[key: string]: string} = {
        'OAuthSignin': '连接谷歌服务失败，请检查您的网络环境或尝试其他登录方式',
        'OAuthCallback': '从谷歌获取用户信息失败，请检查您的网络环境或尝试其他登录方式',
        'no_code': '无法获取授权码，认证失败',
        'auth_failed': '认证失败，请重试',
        'callback_error': '处理认证过程中发生错误'
      };
      
      setError(errorMessages[errorType] || '登录过程中发生错误');
    }
  }, [searchParams]);

  // 生成直接授权URL
  useEffect(() => {
    try {
      // 尝试获取自定义Google认证URL
      const url = getGoogleAuthUrl();
      if (url) {
        setAuthUrl(url);
      }
      
      // 获取模拟登录URL
      const mockUrl = getMockAuthUrl();
      setMockAuthUrl(mockUrl);
    } catch (err) {
      console.error('生成认证URL错误:', err);
    }
    
    // 检查是否已经通过自定义方式登录
    const user = checkLoggedIn() || checkMockLoggedIn();
    if (user) {
      router.push('/');
    }
  }, [getGoogleAuthUrl, checkLoggedIn, router]);

  // 如果用户已登录，重定向到主页
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/');
    }
  }, [session, status, router]);

  // 使用标准NextAuth方式登录
  const handleStandardGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn('google', { 
        callbackUrl: '/',
        redirect: true,
      });
    } catch (err) {
      console.error('NextAuth登录错误:', err);
      setError('登录过程中发生错误，请尝试其他登录方式');
    } finally {
      setLoading(false);
    }
  };
  
  // 使用自定义Google认证方式登录
  const handleCustomGoogleLogin = () => {
    if (authUrl) {
      window.location.href = authUrl;
    } else {
      setError('无法生成谷歌登录链接，请稍后再试');
    }
  };
  
  // 使用模拟登录
  const handleMockLogin = () => {
    if (mockAuthUrl) {
      router.push(mockAuthUrl);
    } else {
      setError('无法生成模拟登录链接');
    }
  };

  if (status === 'loading' || googleAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-light dark:bg-ink-dark py-12 relative ink-wash-bg">
        <div className="ink-splash ink-splash-1"></div>
        <div className="ink-splash ink-splash-2"></div>
        <div className="ink-splash ink-splash-3"></div>
        <div className="max-w-md w-full p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-earth mx-auto"></div>
            <p className="mt-4 text-earth dark:text-earth">正在加载...</p>
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
          <h1 className="text-3xl font-bold text-earth dark:text-earth mt-4 ink-text">登录</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            登录以访问个性化的命运分析和更多功能
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 rounded-md bg-fire/10 text-fire text-center">
            {error}
            <p className="mt-2 text-sm">
              如果您在中国大陆地区，请尝试下方的"备用谷歌登录方式"或"模拟登录（仅开发环境）"
            </p>
          </div>
        )}
        
        <div className="space-y-6">
          <button
            onClick={handleStandardGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-ink-dark hover:bg-gray-50 dark:hover:bg-ink-dark/80 transition-colors"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-700 dark:border-gray-300 mr-2"></div>
            ) : (
              <FcGoogle className="w-5 h-5 mr-2" />
            )}
            标准谷歌账号登录
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">或者</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          
          <button
            onClick={handleCustomGoogleLogin}
            className="flex items-center justify-center w-full px-4 py-3 border border-earth dark:border-earth rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-ink-dark hover:bg-gray-50 dark:hover:bg-ink-dark/80 transition-colors"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            备用谷歌登录方式
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">开发选项</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          
          <button
            onClick={handleMockLogin}
            className="flex items-center justify-center w-full px-4 py-3 border border-gray-400 dark:border-gray-500 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-ink-dark hover:bg-gray-50 dark:hover:bg-ink-dark/80 transition-colors"
          >
            <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            模拟登录（仅开发环境）
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              还没有账号？{' '}
              <Link href="/register" className="text-fire hover:underline">
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 