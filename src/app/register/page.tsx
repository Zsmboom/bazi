'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 如果用户已登录，重定向到主页
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/');
    }
  }, [session, status, router]);

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      console.error('注册错误:', err);
      setError('注册过程中发生错误，请稍后再试');
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
          <h1 className="text-3xl font-bold text-earth dark:text-earth mt-4 ink-text">注册</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            创建账号以获取个性化的命运分析和更多功能
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 rounded-md bg-fire/10 text-fire text-center">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-ink-dark hover:bg-gray-50 dark:hover:bg-ink-dark/80 transition-colors"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-700 dark:border-gray-300 mr-2"></div>
            ) : (
              <FcGoogle className="w-5 h-5 mr-2" />
            )}
            使用谷歌账号注册
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              已有账号？{' '}
              <Link href="/login" className="text-fire hover:underline">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 