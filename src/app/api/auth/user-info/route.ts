import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function GET(request: NextRequest) {
  try {
    // 从请求头中获取授权令牌
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '缺少授权令牌' }, { status: 401 });
    }
    
    const accessToken = authHeader.substring(7);
    
    // 构建请求选项
    const options = {
      hostname: 'www.googleapis.com',
      port: 443,
      path: '/oauth2/v3/userinfo',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      timeout: 10000,
      // 禁用SSL验证，在生产环境中应移除此选项
      rejectUnauthorized: false
    };
    
    // 进行请求获取用户信息
    const userInfo = await new Promise<any>((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (res.statusCode !== 200) {
              console.error('Google用户信息请求失败:', response);
              reject(new Error(response.error_description || response.error || '用户信息请求失败'));
            } else {
              resolve(response);
            }
          } catch (error) {
            console.error('解析Google用户信息响应失败:', error);
            reject(error);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('用户信息请求网络错误:', error);
        reject(error);
      });
      
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('用户信息请求超时'));
      });
      
      // 发送请求
      req.end();
    });
    
    // 返回用户信息
    return NextResponse.json({
      id: userInfo.sub,
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.picture,
      emailVerified: userInfo.email_verified
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取用户信息时发生未知错误' },
      { status: 500 }
    );
  }
} 