import React from 'react';
import Logo from '@/Components/Logo';

export default function Guest({ children }) {
    return (
        <main className="w-full min-h-screen grid grid-cols-2">
            <div className="hidden lg:block pattern lg:col-span-1">
                <div className="flex justify-center items-center bg-primary-light w-full h-full bg-opacity-95">
                    <Logo className={"w-32 h-32"} />
                </div>
            </div>
            <div className="col-span-2 lg:col-span-1 flex justify-center items-center lg:items-start lg:justify-start ornamen-ui bg-ui">
                <div className="w-full h-full px-4 pt-14 lg:px-10 sm:max-w-md md:max-w-lg lg:max-w-md bg-ui bg-opacity-80 sm:bg-transparent"> 
                    {children}
                </div>
            </div>
        </main>
    );
}
