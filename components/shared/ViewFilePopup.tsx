import React, { useEffect, useState } from 'react';

import { File } from '@/lib/types/shared/item.types';

import Image from 'next/image';

type Props = {
    files: File[];
    file: File | null;
    type: string | null;
    index: number | null;
    resetVariables: () => void;
};

export default function ViewFilePopup({ files, file, type, index, resetVariables }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [controlsHidden, setControlsHidden] = useState<boolean>(false);

    let timer: any;

    useEffect(() => {
        if (files === null || file === null || type === null || index === null) {
            return;
        }

        setOpen(true);

        
        const handleKeyDown = (e: KeyboardEvent) => {
            console.log(e.key);
            
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [files, file, type, index]);

    useEffect(() => {
        if (open) {
            document.documentElement.style.overflow = 'hidden';

            timer = setTimeout(() => {
                setControlsHidden(true);
            }, 3000);
        } else {
            document.documentElement.style.overflow = '';
        }
    }, [open]);

    const handleClosePopup = (e: any) => {
        if (e.target === e.currentTarget || e.target.id === 'bg') {
            handleClose();
        }
    };

    const handleReplay = (e: any) => {
        e.target.currentTime = 0;
        e.target.play();
    };

    const handleControls = () => {
        setControlsHidden(false);

        timer = setTimeout(() => {
            setControlsHidden(true);
        }, 3000);
    };

    const handleClose = () => {
        setOpen(false);

        clearTimeout(timer);
        setControlsHidden(false);

        resetVariables();
    };

    return (
        <div className={`bg-dark-950 fixed inset-0 z-50 ${open ? '' : 'hidden'}`} onClick={(e) => handleClosePopup(e)} onMouseMove={handleControls} onTouchEnd={handleControls}>
            <div id='bg' className='w-full h-full relative flex'>
                <Image
                    src="/images/icons/close.svg"
                    alt="Close"
                    width={30}
                    height={30}
                    onClick={() => {
                        handleClose();
                    }}
                    className='m-5 md:m-3 absolute top-0 right-0 z-20 cursor-pointer'
                />

                <Image
                    src="/images/icons/arrow-left.svg"
                    alt="Previous"
                    width={50}
                    height={50}
                    onClick={() => {
                        alert('Previous');
                        // ==========================================
                        // do things with index when arrow is clicked
                        // ==========================================
                    }}
                    className={`ml-1 md:ml-3 absolute top-1/2 -translate-y-1/2 left-0 z-20 cursor-pointer ${controlsHidden ? 'fade-out' : ''}`}
                />

                <Image
                    src="/images/icons/arrow-right.svg"
                    alt="Next"
                    width={50}
                    height={50}
                    onClick={() => {
                        alert('Next');
                        // ==========================================
                        // do things with index when arrow is clicked
                        // ==========================================
                    }}
                    className={`mr-1 md:mr-3 absolute top-1/2 -translate-y-1/2 right-0 z-20 cursor-pointer ${controlsHidden ? 'fade-out' : ''}`}
                />

                {type === 'image' && file && (
                    <img className='max-w-full max-h-dvh m-auto' src={file.assetPaths[0]} alt={file.name} />
                )}

                {type === 'video' && file && (
                    <video id='video' className='max-w-full max-h-dvh m-auto' controls autoPlay onEnded={handleReplay}>
                        <source src={file.assetPaths[0]} type={file.mime} />
                    </video>
                )}

                {type === 'audio' && file && (
                    <audio id='audio' className='max-w-full m-auto' controls autoPlay onEnded={handleReplay}>
                        <source src={file.assetPaths[0]} type={file.mime} />
                    </audio>   
                )}

                {(type === 'text' || type === 'json') && file && (
                    <iframe src={file.assetPaths[0]} className='w-full h-full py-20 px-12' />
                )}
            </div>
        </div>
    );
}