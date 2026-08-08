import React from 'react';
import { ThemeButton } from '../theme-button';
import { Button } from '@/src/ui';
import { BrandGithubIcon, StarIcon } from '../../../../core/src';

export const LandingHeader = () => {
  return (
    <header className='flex justify-between px-4 pt-3'>
      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>tabler-animated</h4>
      <div className='bg-background/70 supports-[backdrop-filter]:bg-background/60 border-border/70 flex items-center gap-0.5 rounded-xl border backdrop-blur'>
        <Button size='sm' className='gap-1.5 rounded-xl' variant='ghost'>
          <BrandGithubIcon />
          <StarIcon />
          <div>0</div>
        </Button>
        <Button size='icon-sm' className='rounded-xl' variant='ghost'>
          <StarIcon />
        </Button>
        <ThemeButton />
      </div>
    </header>
  );
};
