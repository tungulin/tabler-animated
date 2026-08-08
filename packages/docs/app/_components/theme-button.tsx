'use client';

import type { ComponentProps, MouseEvent } from 'react';

import { useTheme } from '@/app/_contexts/theme';
import { Button } from '@/src/ui';
import { ContrastIcon } from '../../../core/src';

type ThemeButtonProps = ComponentProps<typeof Button>;

export const ThemeButton = (props: ThemeButtonProps) => {
  const theme = useTheme();

  const onThemeClick = () => theme.set(theme.value === 'dark' ? 'light' : 'dark');

  return (
    <Button className='rounded-xl' variant='ghost' size='icon-sm' onClick={onThemeClick} {...props}>
      <ContrastIcon />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};
