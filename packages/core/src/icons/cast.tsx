'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const SIGNAL_PATHS = [
  { d: 'M3 19l.01 0', delay: 0 },
  { d: 'M7 19a4 4 0 0 0 -4 -4', delay: 0.1 },
  { d: 'M11 19a8 8 0 0 0 -8 -8', delay: 0.2 }
];

const SIGNAL_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: (delay: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.35, delay, ease: 'easeOut' }
  })
};

const IconCast = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

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
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M15 19h3a3 3 0 0 0 3 -3v-8a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -2.8 2' />
          {SIGNAL_PATHS.map((signal) => (
            <motion.path
              key={signal.d}
              animate={controls}
              custom={signal.delay}
              initial='normal'
              d={signal.d}
              variants={SIGNAL_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconCast.displayName = 'IconCast';

export { IconCast };
