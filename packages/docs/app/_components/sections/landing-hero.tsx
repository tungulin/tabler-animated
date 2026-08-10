'use client';

import { useEffect, useRef } from 'react';
import { IconEaseInOutControlPoints } from '../../../../core/src';
import { BorderBeam, Card, TextAnimate } from '@/src/ui';
import { Link } from '../link';
import { CodeBlockCommand } from '../code-block';

export const LandingHero = () => {
  const logoIconRef = useRef(null);

  useEffect(() => {
    logoIconRef.current.startAnimation();
  }, []);

  return (
    <div className='mt-18 flex w-full flex-col items-center justify-center gap-5'>
      <Card className='relative overflow-hidden p-4'>
        <IconEaseInOutControlPoints ref={logoIconRef} size={80} />
        <BorderBeam duration={6} size={100} />
      </Card>
      <TextAnimate
        as='h1'
        className='max-w-4xl text-xl font-semibold tracking-tight text-balance sm:text-3xl lg:leading-[1.1] lg:font-semibold xl:text-4xl xl:tracking-tighter'
      >
        Static icons are so last decade
      </TextAnimate>
      <p className='text-foreground sm:text-md max-w-xl px-3 text-center text-base'>
        Open-source, buttery-smooth animated icons - drop them into any project and ship faster.
        Feedback and contributions always welcome
      </p>
      <p className='flex items-center gap-1 text-base font-semibold sm:text-lg'>
        Crafted with
        <Link href='https://motion.dev'>Motion</Link>&
        <Link href='https://tabler.io/icons'>Tabler</Link>
      </p>
      <CodeBlockCommand className='mt-4' />
    </div>
  );
};
