import React from 'react'

export default function ProgressBar({ percentage }) {
  return (
    <div className="w-full relative">
        <div className="bg-primary-dark h-2 md:h-3 rounded-full absolute left-0 top-0" style={{width: `${percentage}%` }}></div>
        <div className="bg-primary-light h-2 md:h-3 rounded-full"></div>
    </div>
  )
}
