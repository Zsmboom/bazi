import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// This API route is for development purposes only
// It allows you to check if users are being stored in MongoDB

export async function GET(request: NextRequest) {
  // Only allow in development environment
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'This endpoint is only available in development mode' }, { status: 403 });
  }

  try {
    // Check if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Get users from the users collection
    const users = await db.collection('users').find({}).limit(10).toArray();
    const accounts = await db.collection('accounts').find({}).limit(10).toArray();
    const sessions = await db.collection('sessions').find({}).limit(10).toArray();

    // Return database information
    return NextResponse.json({
      collections: {
        users: users.length,
        accounts: accounts.length,
        sessions: sessions.length
      },
      users: users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        createdAt: user.createdAt
      }))
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch users from database' },
      { status: 500 }
    );
  }
} 