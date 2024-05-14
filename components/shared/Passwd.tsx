"use client";

import React, { createRef, useState } from 'react';
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
            localStorage.setItem('passwd', passwd);
            window.location.reload();
        } else {
            setError('Invalid password');
        }
    };

    return (
        <>
            {localStorage.getItem('passwd') === passwd ? children : (
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
