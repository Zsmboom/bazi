/**
 * Google认证代理工具
 * 用于在无法直接访问Google OAuth服务的环境中获取认证
 */
import { useState, useCallback } from 'react';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 创建自定义Google授权URL
   */
  const getGoogleAuthUrl = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError('缺少Google客户端ID配置');
      return null;
    }
    
    // 创建随机状态值以防止CSRF攻击
    const state = Math.random().toString(36).substring(2, 15);
    // 保存到localStorage以便验证
    localStorage.setItem('googleAuthState', state);
    
    // 创建重定向URI
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/google-callback`);
    
    // 构建授权URL
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&prompt=consent&access_type=offline&state=${state}`;
  }, []);

  /**
   * 处理授权码并获取令牌
   */
  const handleGoogleAuthCode = useCallback(async (code: string, state: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // 验证状态值以防止CSRF攻击
      const savedState = localStorage.getItem('googleAuthState');
      if (savedState !== state) {
        throw new Error('状态验证失败，可能存在安全风险');
      }
      
      // 清除状态
      localStorage.removeItem('googleAuthState');
      
      // 向后端API发送授权码以获取令牌
      const response = await fetch('/api/auth/exchange-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '令牌交换失败');
      }
      
      const data = await response.json();
      
      // 存储令牌
      localStorage.setItem('googleAccessToken', data.accessToken);
      localStorage.setItem('googleIdToken', data.idToken);
      
      // 获取用户信息
      const userResponse = await fetch('/api/auth/user-info', {
        headers: {
          'Authorization': `Bearer ${data.accessToken}`,
        },
      });
      
      if (!userResponse.ok) {
        throw new Error('获取用户信息失败');
      }
      
      const userData = await userResponse.json();
      
      // 存储用户信息
      localStorage.setItem('googleUser', JSON.stringify(userData));
      
      // 返回用户数据
      return userData;
    } catch (err) {
      setError(err instanceof Error ? err.message : '认证过程中发生错误');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 检查用户是否已登录
   */
  const checkLoggedIn = useCallback(() => {
    const token = localStorage.getItem('googleAccessToken');
    const user = localStorage.getItem('googleUser');
    return token && user ? JSON.parse(user) : null;
  }, []);

  /**
   * 登出
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