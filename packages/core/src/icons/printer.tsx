'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useId, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const FEED_DISTANCE = 7;

const SHEET_VARIANTS: Variants = {
  normal: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.2 }
  },
  animate: {
    y: [0, FEED_DISTANCE, FEED_DISTANCE, 0, 0],
    opacity: [1, 1, 0, 0, 1],
    transition: {
      duration: 1.2,
      times: [0, 0.45, 0.5, 0.55, 1],
      ease: 'easeInOut'
    }
  }
};

const IconPrinter = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const clipId = `printer-sheet-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal')
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start('animate');
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start('normal');
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={size}
          height={size}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <defs>
            <clipPath id={clipId}>
              <rect x='-2' y='-10' width='28' height='19' />
            </clipPath>
          </defs>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <g clipPath={`url(#${clipId})`}>
            <motion.path
              animate={controls}
              initial='normal'
              d='M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4'
              variants={SHEET_VARIANTS}
            />
          </g>
          <path d='M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2' />
          <path d='M7 15a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2l0 -4' />
        </svg>
      </div>
    );
  }
);

IconPrinter.displayName = 'IconPrinter';

export { IconPrinter };
