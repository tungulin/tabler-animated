'use client';

import { useRef } from 'react';
import { Card } from '@/src/ui';
import type { IconComponent, IconHandle } from 'tabler-animated';

interface Props {
  name: string;
  icon: IconComponent;
}

export const IconCard = (props: Props) => {
  const iconRef = useRef<IconHandle>(null);

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  const Icon = props.icon;

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='flex flex-col items-center gap-5 px-5 pt-6 pb-3'
    >
      <Icon size={38} ref={iconRef} />
      <small className='text-sm leading-none font-medium'>{props.name}</small>
    </Card>
  );
};
