"use client";

import React from 'react';

import { DefaultPageProps } from '@/lib/types/shared/page.types';
import { usePathname } from '@/lib/navigation';
import Image from 'next/image';

export default function BackBtn({ params }: DefaultPageProps) {
    let pathname = usePathname();
    pathname = pathname.split('/').slice(0, -2).join('/');

    return (
        <a href={`/${params.locale}${pathname}`}>
            <Image
                src="/images/icons/arrow-left.svg"
                width={40}
                height={40}
                className="w-10 h-auto fade-in block"
                alt="Back"
            />
        </a>
    );
}
