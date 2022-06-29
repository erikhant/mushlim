import React, { useRef } from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Button({ 
    to = '#',
    id,
    type = 'button', 
    className = '', 
    processing = false, 
    variant = 'default',
    isActive,
    onClick,
    children,
    self,
    ...props 
}) {
    const style = {
        padding: 'px-7 py-1.5',
        base: 'text-xs sm:text-base inline-flex justify-center items-center focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light focus-visible:ring-opacity-60 rounded-full tracking-wide transition ease-in-out duration-200',
        default: `${isActive ? 'font-semibold text-primary-normal' : 'font-normal text-secondary-dark'} hover:text-secondary-normal`,
        solid: 'bg-primary-normal shadow-neutral-400 font-semibold text-white',
        dark: 'bg-primary-dark shadow-primary-normal font-normal text-white',
        outline: 'border border-primary-dark font-semibold text-primary-dark hover:bg-gray-200 hover:bg-opacity-60',
        circle: 'p-3'
    }

    const setVariant = (variant) => {
        switch (variant) {
            case 'solid':
                return `${style.base} ${style.solid} ${style.padding}`;
            case 'solid-block':
                return `${style.base} ${style.solid} ${style.padding} w-full`;
            case 'solid-circle':
                return `${style.base} ${style.solid} ${style.circle}`;
            case 'dark':
                return `${style.base} ${style.dark} ${style.padding}`;
            case 'dark-block':
                return `${style.base} ${style.dark} ${style.padding} w-full`;
            case 'dark-circle':
                return `${style.base} ${style.dark} ${style.circle}`;
            case 'outline':
                return `${style.base} ${style.outline} ${style.padding}`;
            case 'outline-block':
                return `${style.base} ${style.outline} ${style.padding} w-full`;
            case 'outline-circle':
                return `${style.base} ${style.outline} ${style.circle}`;
            default:
                return style.default
        }
    }

    return (
        type === 'a' ?
            <Link
                ref={self} 
                id={id}
                href={to}
                className={[setVariant(variant), processing ? 'opacity-50' : '', className].join(' ')}
                disabled={processing}
                onClick={onClick}
                {...props}
            >
                {children}
            </Link>
        :
            <button
                id={id}
                ref={self}
                type={type}
                onClick={onClick}
                className={[setVariant(variant), processing ? 'opacity-50' : '', className].join(' ')}
                disabled={processing}
                {...props}
            >
                {children}
            </button>
    );
}
