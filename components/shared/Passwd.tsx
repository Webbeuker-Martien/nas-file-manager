"use client";

import React, { createRef, useState, useEffect } from 'react';
import Container from '@/components/shared/Container';

type Props = {
    children: React.ReactNode;
};

export default function Passwd({ children }: Props) {
    const input = createRef<HTMLInputElement>();
    const [error, setError] = useState('');

    const passwd = process.env.NEXT_APP_PASSWD || '';

    const validateInput = () => {
        if (input.current?.value === passwd) {
            // localStorage.setItem('passwd', passwd);
	    setWithExpiry("passwd", passwd, 300000);
            window.location.reload();
        } else {
            setError('Incorrect password');
        }
    };

    function setWithExpiry(key: string, value: string, ttl: number) {
	const now = new Date();

	const item = {
	    value: value,
	    expiry: now.getTime() + ttl,
	}

        if (localStorage) {
	    localStorage.setItem(key, JSON.stringify(item));
        }
    }

    function getWithExpiry(key: string) {
	let itemStr = null;

	if (localStorage) {
	    itemStr = localStorage.getItem(key);
	}

	if (!itemStr) {
	    return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (now.getTime() > item.expiry) {
	    if (localStorage) {
	        localStorage.removeItem(key);
	    }
	    return null;
	}
	return item.value;
    }


    return (
        <>
            {getWithExpiry("passwd") === passwd ? children : (
                <section>
                    <Container padding={false} className="flex flex-col gap-3">
                        <div className='max-w-2/3'>
                            <input ref={input} type="text" placeholder='Please enter the password' className='text-lg w-full bg-dark-900 border border-dark-800 rounded-lg' />
                            {error && error !== '' && <p className='text-red-500 mt-1'>{error}</p>}
                        </div>
                        <button onClick={validateInput} className='max-w-2/3 bg-dark-900 border border-dark-800 px-10 py-2 rounded-lg'>Submit</button>
                    </Container>
                </section>
            )}
        </>
    );
}
