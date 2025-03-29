'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllMockUsers, handleMockLogin } from '../../utils/mockAuthService';
import Link from 'next/link';

// 使用 useSearchParams 的组件
function MockAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [users] = useState(getAllMockUsers());
  
  // 获取状态参数
  const state = searchParams.get('state');
  
  // 如果没有状态参数，显示错误
  useEffect(() => {
    if (!state) {
      setError('状态参数缺失，可能存在安全风险');
    }
  }, [state]);
  
  // 处理用户选择
  const handleUserSelect = (userId: string) => {
    if (!state) {
      setError('状态参数缺失，无法完成登录');
      return;
    }
    
    // 处理模拟登录
    const success = handleMockLogin(userId, state);
    
    if (success) {
      // 登录成功，重定向到首页
      router.push('/');
    } else {
      // 登录失败
      setError('登录处理失败，请重试');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-light dark:bg-ink-dark py-12 relative ink-wash-bg">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="max-w-md w-full p-8 relative z-10 ink-card">
        <div className="text-center mb-8">
          <div className="bagua-symbol mx-auto"></div>
          <h1 className="text-3xl font-bold text-earth dark:text-earth mt-4 ink-text">模拟谷歌登录</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            这是一个开发环境中的模拟登录页面，无需连接真实谷歌服务
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 rounded-md bg-fire/10 text-fire text-center">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-earth dark:text-earth mb-3">选择一个用户账号：</h2>
          
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user.id)}
              className="flex items-center w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-ink-dark/80 transition-colors"
            >
              <img 
                src={user.image} 
                alt={user.name} 
                className="w-10 h-10 rounded-full mr-4" 
              />
              <div className="text-left">
                <div className="font-medium text-gray-700 dark:text-gray-300">{user.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
            </button>
          ))}
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
            <Link 
              href="/login" 
              className="block text-center text-fire hover:underline"
            >
              返回登录页面
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 加载中回退UI
function LoadingMockAuth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-light dark:bg-ink-dark py-12 relative ink-wash-bg">
      <div className="ink-splash ink-splash-1"></div>
      <div className="ink-splash ink-splash-2"></div>
      <div className="ink-splash ink-splash-3"></div>
      <div className="max-w-md w-full p-8 relative z-10 ink-card">
        <div className="text-center mb-8">
          <div className="bagua-symbol mx-auto"></div>
          <h1 className="text-3xl font-bold text-earth dark:text-earth mt-4 ink-text">模拟谷歌登录</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-earth mx-auto mt-6"></div>
          <p className="mt-4 text-earth dark:text-earth">正在加载模拟账号...</p>
        </div>
      </div>
    </div>
  );
}

// 主页面组件使用 Suspense 包裹
export default function MockAuthPage() {
  return (
    <Suspense fallback={<LoadingMockAuth />}>
      <MockAuthContent />
    </Suspense>
  );
} 