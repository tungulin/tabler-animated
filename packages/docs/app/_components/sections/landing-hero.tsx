'use client';

import { useEffect, useRef } from 'react';
import { EaseInOutControlPoints } from '../../../../core/src';
import { TextAnimate } from '@/src/ui';

export const LandingHero = () => {
  const logoIconRef = useRef(null);

  useEffect(() => {
    logoIconRef.current.startAnimation();
  }, []);

  return (
    <div className='mt-30 flex w-full flex-col items-center justify-center gap-9'>
      <EaseInOutControlPoints ref={logoIconRef} size={80} />
      <TextAnimate
        as='h1'
        className='max-w-4xl text-3xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-4xl xl:tracking-tighter'
      >
        Static icons are so last decade
      </TextAnimate>
      <p className='text-foreground max-w-3xl text-center text-base sm:text-lg'>
        Open-source (MIT), buttery-smooth animated icons - drop them into any project and ship
        faster. Feedback and contributions always welcome
      </p>
      <p className='flex items-center gap-1 text-lg font-semibold'>
        Crafted with
        <a
          href='https://motion.dev/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          Motion
        </a>
        &
        <a
          href='https://tabler.io/icons/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          Tabler
        </a>
      </p>
    </div>
  );
};
