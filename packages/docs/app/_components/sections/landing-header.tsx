import React from 'react';
import { ThemeButton } from '../theme-button';

export const LandingHeader = () => {
  return (
    <header className='flex justify-between px-4 pt-6'>
      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>tabler-animated</h4>
      <ThemeButton />
    </header>
  );
};
