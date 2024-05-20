import React, { useEffect, useRef } from 'react';

import { DefaultPageProps } from '@/lib/types/shared/page.types';
import Each from '@/components/helpers/Each';

type Props = {
    data: any;
} & DefaultPageProps;

export default function Breadcrumb({ data, params }: Props) {
    const breadcrumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (breadcrumbRef.current) {
            breadcrumbRef.current.scrollLeft = breadcrumbRef.current.scrollWidth;
        }
    }, []);

    return (
        <div ref={breadcrumbRef} className="flex justify-between items-center mx-15 overflow-x-auto no-scrollbar">
            <h2 className="leading-5 text-nowrap">
                {data.host && (
                    data.type === 'music' ? (
                        <a href={`/${params.locale}/music/${data.host.name}`} className="text-dark-50 hover:text-white">{data.host.name}</a>
                    ) : (
                        <a href={`/${params.locale}/${data.host.name}`} className="text-dark-50 hover:text-white">{data.host.name}</a>
                    )
                )}

                {data.host && data.path.length > 0 && (
                    <span className="text-dark-50"> / </span>
                )}

                <Each of={data.path} render={(path: string, index: number) => (
                    <>
                        {data.type === 'music' ? (
                            <a href={`/${params.locale}/music/${data.host.name}/${data.path.slice(0, index + 1).join('/')}`} className="text-dark-50 hover:text-white">{path}</a>
                        ) : (
                            <a href={`/${params.locale}/${data.host.name}/${data.path.slice(0, index + 1).join('/')}`} className="text-dark-50 hover:text-white">{path}</a>
                        )}

                        {index !== data.path.length - 1 && (
                            <span className="text-dark-50"> / </span>
                        )}
                    </>
                )} />
            </h2>
        </div>
    );
}
