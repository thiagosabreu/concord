// pages/index.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { ModeToggle } from '@/components/mode-toggle';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Developer {
    name: string;
    image: string;
    description: string;
    github: string;
}

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
            <nav className="w-full py-4 bg-gradient-to-r-custom dark:bg-gradient-to-r-dark dark:bg-black">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <div className="flex items-center space-x-4 ">
                        <Image
                            src="/concord-logo.png"
                            alt="logo"
                            width={50}
                            height={50}
                            className="object-logo dark:invert"
                        />
                        <span className="font-logo text-xl font-bold text-black dark:text-white">Concord</span>
                    </div>
                    <div className='flex items-center justify-center'>
                    <ModeToggle/>
                    <motion.button
                    onClick={handleSignIn}
                    className="bg-[#df9ff7] hover:bg-[#29298a] text-sm text-black dark:text-white font-bold py-2 px-4 rounded dark:bg-[#29298a] dark:hover:bg-[#df9ff7]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Login
                </motion.button>
                    </div>
                    
                </div>
            </nav>
            <motion.main
                className="flex flex-col items-center justify-center min-h-screen flex-1  px-6 py-12 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center justify-center flex-wrap">
                        <div>
                            <div>
                                <h1 className="text-left font-body z-4 text-white tracking-tight uppercase w-full text-[50px] relative">
                                    BATE-PAPO <br />EM GRUPO <br />REPLETO DE <br />DIVERSÃO E <br />JOGOS
                                </h1>
                            </div>
                            <div>
                                <p className="text-black dark:text-white text-lg md:text-xl text-left">
                                    O Concord é ótimo para jogar e relaxar <br />com os amigos, ou até mesmo para <br />criar uma comunidade mundial. <br />Personalize seu espaço para <br /> conversar, jogar e curtir.
                                </p>
                            </div>
                        </div>
                        <img
                            src="/computer-img.png"
                            alt="logo"
                            className="w-[715px] "
                            
                        />
                    </div>

                </div>
            </motion.main>
            <div className="min-h-screen w-full flex flex-col items-center py-12">
                <h1 className="font-body text-black dark:text-white text-4xl md:text-6xl font-bold mb-6 text-center">DEVELOPERS</h1>
                <div className="flex flex-wrap justify-center gap-8 px-4">
                    {developers.map((dev) => (
                        <DeveloperCard key={dev.name} dev={dev} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const DeveloperCard = ({ dev }: { dev: Developer }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            className="flex flex-col items-center max-w-sm mb-8 p-4 rounded-lg shadow-lg dark:bg-[#29298a]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
        >
            <div className="w-full">
                <Image
                    src={dev.image}
                    alt="foto"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg object-cover w-full"
                />
            </div>
            <h2 className="font-logo text-xl text-black dark:text-white mt-4">{dev.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 text-center mt-2">{dev.description}</p>
            <motion.div
                onClick={() => window.open(dev.github, '_blank')}
                className="cursor-pointer mt-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
            >
                <Image
                    src="/github-logo.png"
                    alt="GitHub"
                    width={40}
                    height={40}
                    className="dark:invert"
                />
            </motion.div>
        </motion.div>
    );
};

const developers: Developer[] = [
    {
        name: 'Richard Cordeiro',
        image: '/richard.jpeg',
        description: 'Richard Cordeiro desenvolve o Concord, focando na arquitetura e escalabilidade, garantindo um backend robusto e eficiente para o projeto.',
        github: 'https://github.com/RichardCordeiro'
    },
    {
        name: 'Victor Nogueira',
        image: '/victor.jpeg',
        description: 'Victor Nogueira é frontend do Concord, criando interfaces intuitivas e responsivas, aplicando melhores práticas de design e usabilidade.',
        github: 'https://github.com/victorgsnogueira'
    },
    {
        name: 'Thiago Abreu',
        image: '/thiago.jpeg',
        description: 'Thiago Abreu lidera o Concord no GitHub, coordenando a equipe, revisando códigos e gerenciando lançamentos, assegurando evolução contínua.',
        github: 'https://github.com/thiagosabreu'
    }
];

export default WelcomePage;