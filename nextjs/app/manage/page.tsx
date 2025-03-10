'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BusinessAccount {
  accountName: string;
  name: string;
  type: string;
  state: string;
}

export default function ManagePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accounts, setAccounts] = useState<BusinessAccount[]>([]);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business-info`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        throw new Error('Not authenticated');
      }

      const data = await response.json();
      setAccounts(data.accounts || []);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Session check failed:', error);
      setIsAuthenticated(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!isAuthenticated ? (
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Food Truck Business Management</h1>
          <p className="mb-6">Connect your Google Business Profile to manage your food truck information.</p>
          <Button 
            onClick={handleGoogleLogin}
            className="bg-[#4285f4] hover:bg-[#357abd]"
          >
            Login with Google
          </Button>
        </Card>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-6">Your Business Accounts</h1>
          <div className="space-y-4">
            {accounts.length > 0 ? (
              accounts.map((account, index) => (
                <Card key={index} className="p-4">
                  <h3 className="text-xl font-semibold">{account.accountName || 'Unnamed Account'}</h3>
                  <p className="text-gray-600">Account ID: {account.name}</p>
                  <p className="text-gray-600">Type: {account.type || 'Not specified'}</p>
                  <p className="text-gray-600">State: {account.state || 'Unknown'}</p>
                </Card>
              ))
            ) : (
              <Card className="p-4 text-center">
                <p>No business accounts found. Please set up a Google Business Profile.</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
