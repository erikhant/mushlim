import React from 'react'

export default function Loading() {
    const delay = 100;

    return(
        <div className="flex justify-center items-center space-x-2 py-4">
            <span className="w-2 h-2 bg-primary-dark rounded-full animate-bounce" style={{animationDelay: `${delay}ms`}}></span>
            <span className="w-2 h-2 bg-primary-dark rounded-full animate-bounce" style={{animationDelay: `${delay * 2.3}ms`}}></span>
            <span className="w-2 h-2 bg-primary-dark rounded-full animate-bounce" style={{animationDelay: `${delay * 3.6}ms`}}></span>
        </div>
    )
}