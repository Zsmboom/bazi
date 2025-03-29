import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function GET(request: NextRequest) {
  try {
    // Get authorization token from request headers
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization token is missing' }, { status: 401 });
    }
    
    const accessToken = authHeader.substring(7);
    
    // Build request options
    const options = {
      hostname: 'www.googleapis.com',
      port: 443,
      path: '/oauth2/v3/userinfo',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      timeout: 10000,
      // Disable SSL verification, this should be removed in production
      rejectUnauthorized: false
    };
    
    // Request user information
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
              console.error('Google user info request failed:', response);
              reject(new Error(response.error_description || response.error || 'User info request failed'));
            } else {
              resolve(response);
            }
          } catch (error) {
            console.error('Failed to parse Google user info response:', error);
            reject(error);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('User info request network error:', error);
        reject(error);
      });
      
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('User info request timeout'));
      });
      
      // Send request
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