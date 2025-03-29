import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }
  
  // Create URL containing code and state, redirect to frontend page to process the authorization code
  const redirectUrl = new URL('/auth/callback', request.nextUrl.origin);
  redirectUrl.searchParams.set('code', code);
  if (state) {
    redirectUrl.searchParams.set('state', state);
  }
  
  return NextResponse.redirect(redirectUrl);
} 