import React from 'react';

export default function About() {
    return (
        <div>
            <h1>Go to <a className='text-blue-500' href={`${process.env.NEXT_APP_URL ?? ''}/sitemap.xml`}>{process.env.NEXT_APP_URL ?? ''}/sitemap.xml</a> to see all pages...</h1>
            <h1>Go to tailwind.config.js to change css config...</h1>
        </div>
    )
}