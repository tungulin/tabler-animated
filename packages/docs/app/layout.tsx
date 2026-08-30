import { Geist_Mono, Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { cn } from '../src/lib/utils';
import { ThemeProvider, ThemeScript } from './_contexts/theme';
import { TooltipProvider } from '@/src/ui';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { PropsWithChildren } from 'react';

import '@/styles/globals.css';
import { CONFIG } from '@/src/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tabler-animated-docs.vercel.app'),
  title: {
    default: CONFIG.NAME,
    template: '%s'
  },
  description: CONFIG.DESCRIPTION
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cn('antialiased', fontMono.variable, 'font-sans', inter.variable)}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <NuqsAdapter>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
