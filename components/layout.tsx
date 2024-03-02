import React, { ReactNode } from 'react';
import Head from 'next/head';
import RevealHeader from 'react-revealheader';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

type LayoutProps = {
    children: ReactNode;
    title?: string;
    description?: string;
};

const Layout: React.FC<LayoutProps> = ({
    children,
    title = 'Local Lens',
    description = 'Get a better understanding of your local politicians and how you can leverage your rights to vote.',
}) => {
    return (
        <>
            <RevealHeader upColor='red' neutralColor='red'>
                    <div className='max-w-[1080] p-2 flex place-content-center'>
                        <h1 className='w-fit'>Local Lens</h1>
                        <Avatar>
                            <AvatarImage src='https://github.com/shadcn.png'/>
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </div>
            </RevealHeader>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen bg-secondary text-gray-800">
                <div className="container mx-auto px-4 py-8">
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;