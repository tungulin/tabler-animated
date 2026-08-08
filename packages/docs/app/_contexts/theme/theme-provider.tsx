'use client';

import type { ReactNode } from 'react';

import {
  dispatchCookieEvent,
  getCookie,
  setCookie,
  usePreferredColorScheme
} from '@siberiacancode/reactuse';
import { useLayoutEffect, useMemo, useState } from 'react';

import { COOKIES } from '@/src/constants';

import type { Theme } from './theme-context';

import { ThemeContext } from './theme-context';

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getTheme = (theme: Theme): 'dark' | 'light' => {
  if (theme === 'system') return getSystemTheme();
  return theme;
};

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = usePreferredColorScheme();
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (getCookie(COOKIES.THEME) as Theme | undefined) ?? 'system';
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    const activeTheme = getTheme(theme);

    dispatchCookieEvent();
    setCookie(COOKIES.THEME, theme, {
      path: '/'
    });
    root.classList.remove('light', 'dark');
    root.classList.add(activeTheme);
  }, [theme, colorScheme]);

  const value = useMemo(() => ({ value: getTheme(theme), set: setTheme }), [theme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
};

export const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      (function() {
        const getSystemTheme = () => {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };
        
        const getCookie = (name) => {
          const value = \`; \${document.cookie}\`;
          const parts = value.split(\`; \${name}=\`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };
        
        const theme = getCookie('${COOKIES.THEME}') || 'system';
        const activeTheme = theme === 'system' ? getSystemTheme() : theme;
        
        document.documentElement.classList.add(activeTheme);
      })();
    `
    }}
  />
);
