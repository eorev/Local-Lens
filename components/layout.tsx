import React, { ReactNode } from 'react';
import Head from 'next/head';
import RevealHeader from 'react-revealheader';

type LayoutProps = {
    children: ReactNode;
    title?: string;
    description?: string;
};

const Layout: React.FC<LayoutProps> = ({
    children,
    title = 'Shareable Wordle by eorev',
    description = 'Create and solve custom Wordle puzzles',
}) => {
    return (
        <>
            <RevealHeader upColor='red' neutralColor='red'>
                    <div className='max-w-[1080] m-auto'>
                        <h1 className='w-fit m-auto'>Local Lens</h1>
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