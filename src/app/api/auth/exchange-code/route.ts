import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json({ error: '缺少授权码' }, { status: 400 });
    }
    
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google-callback`;
    
    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: '缺少OAuth客户端配置' }, { status: 500 });
    }
    
    // 创建请求Google OAuth服务的参数
    const tokenParams = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    });
    
    // 构建请求选项
    const options = {
      hostname: 'oauth2.googleapis.com',
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': tokenParams.toString().length
      },
      timeout: 10000,
      // 禁用SSL验证，在生产环境中应移除此选项
      rejectUnauthorized: false
    };
    
    // 进行请求获取令牌
    const tokenResponse = await new Promise<{access_token: string, id_token: string}>((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (res.statusCode !== 200) {
              console.error('Google令牌请求失败:', response);
              reject(new Error(response.error_description || response.error || '令牌请求失败'));
            } else {
              resolve(response);
            }
          } catch (error) {
            console.error('解析Google响应失败:', error);
            reject(error);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('令牌请求网络错误:', error);
        reject(error);
      });
      
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('令牌请求超时'));
      });
      
      // 发送请求
      req.write(tokenParams.toString());
      req.end();
    });
    
    // 返回令牌
    return NextResponse.json({
      accessToken: tokenResponse.access_token,
      idToken: tokenResponse.id_token
    });
  } catch (error) {
    console.error('交换令牌失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '交换令牌时发生未知错误' },
      { status: 500 }
    );
  }
} 