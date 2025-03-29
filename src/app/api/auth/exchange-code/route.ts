import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
    }
    
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google-callback`;
    
    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'OAuth client configuration is missing' }, { status: 500 });
    }
    
    // Create parameters for Google OAuth service request
    const tokenParams = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    });
    
    // Build request options
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
      // Disable SSL verification, this should be removed in production
      rejectUnauthorized: false
    };
    
    // Request to get token
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
              console.error('Google token request failed:', response);
              reject(new Error(response.error_description || response.error || 'Token request failed'));
            } else {
              resolve(response);
            }
          } catch (error) {
            console.error('Failed to parse Google response:', error);
            reject(error);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('Token request network error:', error);
        reject(error);
      });
      
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Token request timeout'));
      });
      
      // Send request
      req.write(tokenParams.toString());
      req.end();
    });
    
    // Return token
    return NextResponse.json({
      accessToken: tokenResponse.access_token,
      idToken: tokenResponse.id_token
    });
  } catch (error) {
    console.error('Failed to exchange token:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred while exchanging token' },
      { status: 500 }
    );
  }
} 