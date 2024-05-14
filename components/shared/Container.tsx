import React from 'react';

type Props = {
    padding?: boolean;
    className?: string;
    children: React.ReactNode;
};

export default function Container({ padding = true, className = '', children }: Props) {
    return (
        <div className={`w-container mx-auto ${padding ? 'py-16' : ''} ${className}`}>
            {children}
        </div>
    )
}
