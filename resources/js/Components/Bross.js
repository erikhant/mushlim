import React from 'react'

export default function Bross({ withAnimation, children, className = 'w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48' }) {
  return (
        <div className={`${withAnimation && 'reading-item'} ${className} text-center rounded-full border border-secondary-light transition ease-in-out duration-200 shadow-2xl shadow-gray-300 bg-ui`}>
            <div className="inline-flex flex-col justify-center items-center w-full h-full rounded-full overflow-hidden">
                {children}
            </div>
            {
                withAnimation && 
                (<span className="inline-block reading-opener mt-4 text-primary-normal font-semibold transition ease-in-out duration-200">Buka</span>)
            }
        </div>
  )
}
