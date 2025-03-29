/**
 * 模拟谷歌认证服务
 * 用于开发环境中测试用户登录功能，无需连接实际的谷歌服务
 */

// 模拟用户数据
const MOCK_USERS = [
  {
    id: '123456789',
    name: '测试用户',
    email: 'test@example.com',
    image: 'https://ui-avatars.com/api/?name=测试用户&background=random',
    emailVerified: true
  },
  {
    id: '987654321',
    name: '开发者',
    email: 'dev@example.com',
    image: 'https://ui-avatars.com/api/?name=开发者&background=random',
    emailVerified: true
  }
];

// 用于存储认证状态的键
const AUTH_STORAGE_KEY = 'mock_auth_user';
const TOKEN_STORAGE_KEY = 'mock_auth_token';

/**
 * 模拟获取认证URL
 */
export function getMockAuthUrl(): string {
  // 生成随机状态用于防止CSRF攻击
  const state = Math.random().toString(36).substring(2, 15);
  
  // 存储状态以供验证
  localStorage.setItem('mock_auth_state', state);
  
  // 创建重定向URL到我们的模拟登录页面
  return `/mock-auth?state=${state}`;
}

/**
 * 模拟登录处理
 */
export function handleMockLogin(userId: string, state: string): boolean {
  // 验证状态
  const savedState = localStorage.getItem('mock_auth_state');
  if (savedState !== state) {
    console.error('状态不匹配，可能存在CSRF攻击');
    return false;
  }
  
  // 清除状态
  localStorage.removeItem('mock_auth_state');
  
  // 查找用户
  const user = MOCK_USERS.find(u => u.id === userId);
  if (!user) {
    console.error('未找到用户');
    return false;
  }
  
  // 生成模拟令牌
  const token = {
    access_token: `mock_access_token_${Date.now()}`,
    id_token: `mock_id_token_${Date.now()}`,
    expires_at: Date.now() + 3600 * 1000 // 1小时后过期
  };
  
  // 存储用户和令牌
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  
  return true;
}

/**
 * 检查用户是否已登录
 */
export function checkMockLoggedIn(): any {
  const userJson = localStorage.getItem(AUTH_STORAGE_KEY);
  const tokenJson = localStorage.getItem(TOKEN_STORAGE_KEY);
  
  if (!userJson || !tokenJson) {
    return null;
  }
  
  const token = JSON.parse(tokenJson);
  
  // 检查令牌是否过期
  if (token.expires_at < Date.now()) {
    // 令牌已过期，清除登录状态
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    return null;
  }
  
  return JSON.parse(userJson);
}

/**
 * 获取登录用户
 */
export function getMockCurrentUser(): any {
  return checkMockLoggedIn();
}

/**
 * 模拟登出
 */
export function mockLogout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem('mock_auth_state');
}

/**
 * 获取所有模拟用户列表
 */
export function getAllMockUsers(): any[] {
  return MOCK_USERS;
}

/**
 * 存储会话到MongoDB
 * 这个函数模拟将用户信息存储到数据库的过程
 */
export async function storeSessionToDb(user: any): Promise<boolean> {
  console.log('模拟存储用户信息到数据库:', user);
  
  // 在真实实现中，这里会调用API将用户信息保存到MongoDB
  // 目前只是模拟成功返回
  return true;
} 