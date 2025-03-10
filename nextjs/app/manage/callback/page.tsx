'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Processing your login...');

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      setStatus('Error: No authorization code received');
      return;
    }

    handleCallback(code);
  }, [searchParams]);

  const handleCallback = async (code: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code })
      });
      
      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`);
      }

      setStatus('Successfully authenticated!');
      
      // Redirect back to manage page after 2 seconds
      setTimeout(() => {
        router.push('/manage');
      }, 2000);
    } catch (error) {
      console.error('Authentication error:', error);
      setStatus(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
        <p>{status}</p>
      </Card>
    </div>
  );
}
