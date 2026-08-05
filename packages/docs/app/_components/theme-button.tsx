'use client';

import type { ComponentProps, MouseEvent } from 'react';

import { useTheme } from '@/app/_contexts/theme';
import { Button } from '@/src/ui';
import { ContrastIcon } from '../../../core/src';

type ThemeButtonProps = ComponentProps<typeof Button>;

export const ThemeButton = (props: ThemeButtonProps) => {
  const theme = useTheme();

  const onThemeClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX;
    const y = event.clientY;
    theme.animate(x, y, theme.value === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button className='rounded-full' size='icon' variant='ghost' onClick={onThemeClick} {...props}>
      <ContrastIcon size={28} />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};
