import React from 'react';

export default function Tooltip({show, coordinate, data}) {
    const { top } = document.body.getBoundingClientRect();

    return (
        show &&
        <div className="tooltip" style={{ left: Math.floor(coordinate.left + coordinate.width),  top: Math.floor(Math.abs(top) + coordinate.top - 35) }}>
          {data && <span>{data}</span>}
        </div>
    )
}
