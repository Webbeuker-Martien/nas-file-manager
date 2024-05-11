"use client";

import React, { useEffect, useRef, useState } from 'react';
import Each from '../helpers/Each';
import { DefaultPageProps } from '@/lib/types/shared/page.types';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { deleteFile } from '@/lib/api/Dir';

type Props = {
    host: any;
    path: string;
} & DefaultPageProps;

export default function Files({ host, path, params }: Props) {
    const t = useTranslations("shared.files");

    const [alreadyAnimated, setAlreadyAnimated] = useState<boolean>(false);
    const [files, setFiles] = useState<any>(null);
    const [openAction, setOpenAction] = useState<number>(-1);

    const itemsRef = useRef<HTMLHeadingElement[] | null[]>([]);

    const actions = [
        {
            icon: '/images/icons/download.svg',
            text: t('actions.download'),
            func: (index: number) => {
                const path = files[index].downloadPath;
                window.open(path);
            }
        },
        {
            icon: '/images/icons/share.svg',
            text: t('actions.share')
        },
        {
            icon: '/images/icons/delete.svg',
            text: t('actions.delete'),
            func: async (index: number) => {
                const path = files[index].relativePath;
                const response: any = await deleteFile(path);
                
                if (response.success === true) {
                    const newFiles = [...files];
                    newFiles.splice(index, 1);

                    setOpenAction(-1);
                    setFiles(newFiles);
                }
            }
        },
    ];

    const handleOpenAction = () => {
        setOpenAction(-1);
    };

    useEffect(() => {
        document.addEventListener('scroll', handleOpenAction);

        return () => {
            document.removeEventListener('scroll', handleOpenAction);
        };
    }, []);
    
    useEffect(() => {
        fetch(host.host + path + '?deepest=false').then((response) => response.json()).then((response) => {
            if (response.success === true) {
                setFiles(response.body);
            }
        });
    }, []);

    useEffect(() => {
        if (files === null) return;
        if (alreadyAnimated) return;

        itemsRef.current = itemsRef.current.slice(0, files.length);

        // check if the text is overflowing
        itemsRef.current.forEach((item, index) => {
            if (item!.offsetWidth < item!.scrollWidth) {
                // duplicate the text
                item?.classList.add('flex', 'gap-5', 'items-center');

                const text = item!.textContent;
                item!.textContent = '';
                item!.innerHTML = `<span>${text}</span><span>${text}<span/>`;

                // create keyframes
                const style = document.createElement('style');
                style.innerHTML = `@keyframes scroll${index} { 0% { transform: translateX(0); } 100% { transform: translateX(-${(item!.scrollWidth / 2) + 10}px); } }`;
                document.head.appendChild(style);

                // set scroll animation
                const duration = item!.scrollWidth / 100;
                item!.style.animation = `scroll${index} ${duration}s linear infinite`;
            }
        });

        setAlreadyAnimated(true);
    }, [files]);

    const openActions = (index: number) => {
        if (openAction === index) {
            setOpenAction(-1);
            return;
        }

        setOpenAction(index);
    };

    return (
        <div>
            {files !== null && files.length > 0 ? (
                <div className="flex flex-col gap-3">
                    <Each of={files} render={(file, index) => (
                        file.type === 'folder' ? (
                            <a href={`/${params.locale}/${host.name}${file.relativePath}`} className="bg-dark-900 border border-dark-800 rounded-lg p-3 flex gap-2 items-center">
                                <Image
                                    src="/images/icons/folder.svg"
                                    alt="Folder"
                                    width={32}
                                    height={32}
                                />

                                <div className='overflow-x-hidden'>
                                    <h1 ref={el => itemsRef.current[index] = el} className='text-nowrap select-none'>{file.name}</h1>

                                    <p className="text-dark-50">{file.children === 0 ? t('empty') : `${file.children} ${t('items')}`}</p>
                                </div>
                            </a>
                        ) : (
                            <div className="bg-dark-900 border border-dark-800 rounded-lg p-3 flex gap-2 justify-between items-center">
                                <div onClick={(e) => alert(t('open_file'))} className="flex gap-2 items-center w-full-min-5 cursor-pointer">
                                    <Image
                                        src={`/images/icons/extensions/${file.ext.replace('.', '')}.svg`}
                                        onError={(e) => {
                                            e.currentTarget.src = '/images/icons/file.svg';
                                        }}
                                        alt="File"
                                        width={32}
                                        height={32}
                                    />

                                    <div className='overflow-x-hidden w-full-min-32px'>
                                        <h1 ref={el => itemsRef.current[index] = el} className='text-nowrap select-none'>{file.name}</h1>

                                        <p className="text-dark-50">{t('size')}</p>
                                    </div>
                                </div>

                                <div className="p-1 flex cursor-pointer relative">
                                    <Image
                                        width={20}
                                        height={20}
                                        src="/images/icons/options.svg"
                                        alt=""
                                        className='w-5 h-5 m-auto'
                                        onClick={() => {
                                            openActions(index)
                                        }}
                                    />

                                    <div className={`absolute z-10 bg-dark-800 rounded-lg p-3 mt-2 top-full right-0 ${openAction == index ? '' : 'hidden'}`}>
                                        <Each of={actions} render={(action, actionIndex) => (
                                            <div key={actionIndex} onClick={() => action.func(index)} className={`first:mt-0 last:mb-0 my-2 flex gap-2 items-center cursor-pointer ${action.text === 'Share' ? ' opacity-10' : ''}`}>
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src={action.icon}
                                                    alt={action.text}
                                                    className='w-5 h-5 opacity-75'
                                                />

                                                <p className="text-dark-50">{action.text}</p>
                                            </div>
                                        )} />
                                    </div>
                                </div>
                            </div>
                        )
                    )} />
                </div>
            ) : files !== null && files.length === 0 ? (
                <h1 className='text-nowrap'>{t('no_results')}</h1>
            ) : (
                <h1 className='text-nowrap'>{t('loading')}</h1>
            )}
        </div>
    );
}
