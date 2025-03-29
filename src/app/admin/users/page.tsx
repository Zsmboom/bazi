'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Simple admin page to check MongoDB users
export default function UsersAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      if (status !== 'authenticated') return;
      
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data.users || []);
        setStats(data.collections || {});
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [status]);
  
  // Loading state
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Users in Database</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-center mt-4">Loading user data...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Users in Database</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Users in Database</h1>
        
        {/* Database Collections Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="font-semibold mb-2">Users</h2>
              <p className="text-3xl font-bold">{stats.users || 0}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="font-semibold mb-2">Accounts</h2>
              <p className="text-3xl font-bold">{stats.accounts || 0}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="font-semibold mb-2">Sessions</h2>
              <p className="text-3xl font-bold">{stats.sessions || 0}</p>
            </div>
          </div>
        )}
        
        {/* Current User */}
        {session?.user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h2 className="font-semibold mb-2">Current User</h2>
            <div className="flex items-center">
              {session.user.image && (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || ''} 
                  className="w-12 h-12 rounded-full mr-4" 
                />
              )}
              <div>
                <p className="font-medium">{session.user.name}</p>
                <p className="text-gray-600">{session.user.email}</p>
                <p className="text-sm text-gray-500">ID: {session.user.id}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Users Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No users found in database
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.image && (
                          <img 
                            src={user.image} 
                            alt={user.name || ''} 
                            className="w-10 h-10 rounded-full mr-3" 
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.emailVerified ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Not Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6">
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mr-2"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
} 