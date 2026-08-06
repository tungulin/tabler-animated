'use client';

import { createContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export interface ThemeContextValue {
  value: Exclude<Theme, 'system'>;
  set: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  value: 'light',
  set: () => {}
});
