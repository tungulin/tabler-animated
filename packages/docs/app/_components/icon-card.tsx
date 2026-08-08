'use client';

import { useRef } from 'react';
import { Button, Card } from '@/src/ui';
import { useHover } from '@siberiacancode/reactuse';
import type { IconComponent, IconHandle } from '../../../core/src/types';

interface Props {
  name: string;
  icon: IconComponent;
}

export const IconCard = (props: Props) => {
  const iconRef = useRef<IconHandle>(null);

  const hovering = useHover<HTMLDivElement>(() => {
    iconRef.current?.startAnimation();
  });

  const Icon = props.icon;

  return (
    <Card ref={hovering.ref} className='flex flex-col items-center gap-5 px-5 pt-6 pb-3'>
      <Icon size={34} ref={iconRef} />
      <small className='text-sm leading-none font-medium'>{props.name}</small>
      <div className='mt-5 flex gap-2'>
        <Button variant='secondary'>T</Button>
      </div>
    </Card>
  );
};
