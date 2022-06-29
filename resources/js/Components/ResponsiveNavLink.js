import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, active = false, children }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? 'font-semibold tracking-wide border-none text-primary-normal focus-visible:bg-neutral-300'
                    : 'font-normal tracking-wide border-none text-secondary-dark focus-visible:bg-neutral-300'
            } text-base focus:outline-none transition duration-150 ease-in-out`}
        >
            {children}
        </Link>
    );
}
