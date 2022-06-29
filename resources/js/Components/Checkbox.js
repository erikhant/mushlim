import React from 'react';

export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded border  text-primary-normal shadow-sm border-primary-dark focus:ring-2 focus:ring-primary-light focus:ring-opacity-60"
            onChange={(e) => handleChange(e)}
        />
    );
}
