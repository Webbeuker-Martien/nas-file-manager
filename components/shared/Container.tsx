import React from 'react';

type Props = {
    padding?: boolean;
    children: React.ReactNode;
}

export default function Container({ padding = true, children }: Props) {
    return (
        <div className={`w-container mx-auto ${padding ? 'py-16' : ''}`}>
            {children}
        </div>
    )
}
