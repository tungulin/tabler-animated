'use client';

import type { ComponentProps, MouseEvent } from 'react';

import { useTheme } from '@/app/_contexts/theme';
import { Button } from '@/src/ui';
import { IconContrast } from 'tabler-animated';

type ThemeButtonProps = ComponentProps<typeof Button>;

export const ThemeButton = (props: ThemeButtonProps) => {
  const theme = useTheme();

  const onThemeClick = () => theme.set(theme.value === 'dark' ? 'light' : 'dark');

  return (
    <Button className='rounded-xl' variant='ghost' size='sm' onClick={onThemeClick} {...props}>
      <IconContrast />
    </Button>
  );
};
