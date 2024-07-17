// pages/index.tsx
'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { ModeToggle } from '@/components/mode-toggle';

const WelcomePage = () => {
    const { isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchUserServer = async () => {
            try {
                const response = await fetch("/api/servers", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
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
        <div className="bg-gradient-to-r-custom min-h-screen flex flex-col items-center justify-center dark:bg-gradient-to-r-dark">
            <nav className="w-full py-4 px-6 bg-white shadow-md dark:bg-black">
                <div className="container-fluid mx-auto flex justify-between items-center">
                    <div className="flex items-center text-xl font-bold text-gray-800">
                        <img
                            src="/concord-logo.png"
                            alt="logo"
                            className="object-logo dark:invert"
                        />
                        <span className="font-logo ml-2 text-black dark:invert">Concord</span>
                    </div>
                    <ModeToggle />
                </div>
            </nav>
            <main className="flex flex-col items-center justify-center flex-1 w-full px-6 py-12">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Bem-vindo ao Concord!</h1>
                <p className="text-lg md:text-xl text-white mb-8 text-center">Junte-se ao concord. <br/> Conecte-se com amigos, participe de comunidades incríveis, e explore um mundo de possibilidades. <br/> No Concord, suas conversas importam.</p>
                <button onClick={handleSignIn} className="bg-[#df9ff7] hover:bg-[#29298a] text-white font-bold py-2 px-4 rounded dark:bg-[#29298a] dark:hover:bg-[#df9ff7]">
                    Login
                </button>
            </main>
        </div>
    );
};

export default WelcomePage;
