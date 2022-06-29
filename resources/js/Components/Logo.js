import React from 'react';

export default function ApplicationLogo({ className }) {
    return (
        <img src="/logo-app.png" className={"rounded overflow-hidden " + className} />
    );
}
