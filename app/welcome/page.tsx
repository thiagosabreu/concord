// pages/index.tsx
'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

const WelcomePage = () => {
    const { isSignedIn } = useAuth();
    const router = useRouter();
    

    useEffect(() => {
        const fetchUserServer = async () => {
            try {
                console.log("Fetching user server...");
                const response = await fetch("/api/servers", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                  });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Server fetched successfully", data);
                    const serverId = data.serverId;
                    router.push(`/servers/${serverId}`);
                } else {
                    console.error('Failed to fetch server.', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        if (isSignedIn) {
            fetchUserServer();
        }
    }, [isSignedIn, router]);
    

    const handleSignIn = () => {
        router.push('/sign-in');
    };

    return (
        <div>
            <h1>Bem-vindo ao nosso site!</h1>
            <button onClick={handleSignIn}>Login</button>
        </div>
    );
};

export default WelcomePage;
