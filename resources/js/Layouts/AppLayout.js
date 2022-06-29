import React from 'react';
import Navbar from '@/Components/Navbar';

export default function AppLayout({ header, className = '', children }) {

    return (
        <div className={'min-h-screen ' + className}>
            <Navbar />
            <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-[90vh]">
                {header && (
                    <header className="rounded drop-shadow-md overflow-hidden">
                        {header}
                    </header>
                )}
                {children}
            </main>
            <footer className="border border-t-stone-300">
                <div className="text-secondary-normal tracking-wide text-center text-xs sm:text-sm py-5">
                    <span>Copyright 2022 Hijrah &nbsp; | &nbsp; All Right Reserved </span>
                </div>
            </footer>
        </div>
    );
}
