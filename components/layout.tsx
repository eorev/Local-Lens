import React, { ReactNode } from 'react';
import Head from 'next/head';

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
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen bg-background text-gray-800">
                <div className="container mx-auto px-4 py-8">
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;