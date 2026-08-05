'use client';

import { Card } from '@/src/ui';
import { BellIcon } from '../../../core/src';
import { useRef } from 'react';
import { useHover } from '@siberiacancode/reactuse';

export const IconCard = () => {
  const iconRef = useRef(null);

  const hovering = useHover<HTMLSpanElement>(() => {
    iconRef.current.startAnimation();
  });

  return (
    <Card ref={hovering.ref} className='flex flex-col items-center gap-5 px-5 py-6'>
      <BellIcon ref={iconRef} />
      <small className='text-sm leading-none font-medium'> a-arrow-down</small>
    </Card>
  );
};
