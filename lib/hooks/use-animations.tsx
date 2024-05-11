'use client';

import React, { useEffect, useState } from 'react'
import { useInView, animated } from '@react-spring/web'
import { buildInteractionObserverThreshold } from '@/lib/helpers/treshold'

type Props = {
    children: React.ReactNode,
    extraclasses?: string,
    amount?: number,
    delay?: number,
    distance?: string,
    direction?: "up" | "down" | "right",
}

export const MoveFadeInAnimation = (props: Props) => {
    const [moveFadeInRef, isMoveFadeInView] = useInView({
        rootMargin: '-5% 0px -5% 0px',
        amount: buildInteractionObserverThreshold(0.5),
    });
    const [animationClass, setAnimationClass] = useState('opacity-0');
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if(isRunning) return;

        if(isMoveFadeInView) {
            setIsRunning(true);

            setTimeout(() => {
                setTimeout(() => {
                    if (isMoveFadeInView) {
                        setAnimationClass(`animate-fade-${props.direction ?? 'up'}`);
                        setTimeout(() => {
                            setIsRunning(false);
                        }, 750);
                    }
                }, props.delay ?? 0);
            }, 50);
        } else {
            setAnimationClass('opacity-0');
        }
    }, [isMoveFadeInView]);

    return (
        <animated.div className={`${props.extraclasses ?? ''} ${animationClass} animated-div`} ref={moveFadeInRef}>
            {props.children}
        </animated.div>
    );
}

export const BounceAnimation = (props: Props) => {
    const [bounceRef, isBounceInView] = useInView({
        rootMargin: '-5% 0px -5% 0px',
        amount: buildInteractionObserverThreshold(props.amount ?? 0.5),
    });
    const [animationClass, setAnimationClass] = useState('opacity-0');

    useEffect(() => {
        if (isBounceInView) {
            setTimeout(() => {
                if (isBounceInView) {
                    setAnimationClass(`animate-bounce`);
                }
            }, props.delay ?? 0);
        } else {
            setAnimationClass('opacity-0');
        }
    }, [isBounceInView]);

    return ( 
        <animated.div className={`${props.extraclasses ?? ''} ${animationClass} animated-div`} ref={bounceRef}>
            {props.children}
        </animated.div>
    );
}