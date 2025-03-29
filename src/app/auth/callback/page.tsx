'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleAuth } from '../../../utils/googleAuthProxy';

export default function GoogleAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleGoogleAuthCode, loading, error } = useGoogleAuth();
  const [processingStatus, setProcessingStatus] = useState('处理中...');

  useEffect(() => {
    const processAuth = async () => {
      try {
        // 获取授权码和状态
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code) {
          setProcessingStatus('未找到授权码，认证失败');
          setTimeout(() => router.push('/login?error=no_code'), 3000);
          return;
        }

        // 处理授权码
        setProcessingStatus('正在与谷歌服务器通信...');
        const userData = await handleGoogleAuthCode(code, state || '');

        if (userData) {
          setProcessingStatus('登录成功！正在跳转...');
          // 登录成功，跳转到首页
          setTimeout(() => router.push('/'), 1500);
        } else {
          setProcessingStatus('登录失败，请重试');
          // 登录失败，跳转到登录页
          setTimeout(() => router.push('/login?error=auth_failed'), 3000);
        }
      } catch (err) {
        console.error('处理OAuth回调错误:', err);
        setProcessingStatus('处理授权时发生错误');
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
          <h1 className="text-2xl font-bold text-earth dark:text-earth mt-4 ink-text">谷歌账号登录</h1>
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