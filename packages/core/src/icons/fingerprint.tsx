'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const RIDGE_PATHS = [
  { d: 'M8 15a18 18 0 0 0 1.8 6', delay: 0 },
  { d: 'M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95', delay: 0.06 },
  { d: 'M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6', delay: 0.12 },
  { d: 'M12 11v2a14 14 0 0 0 2.5 8', delay: 0.18 },
  { d: 'M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3', delay: 0.24 }
];

const RIDGE_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: (delay: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.35, delay, ease: 'easeOut' }
  })
};

const IconFingerprint = forwardRef<IconHandle, IconProps>(
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
          {RIDGE_PATHS.map((ridge) => (
            <motion.path
              key={ridge.d}
              animate={controls}
              custom={ridge.delay}
              initial='normal'
              d={ridge.d}
              variants={RIDGE_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconFingerprint.displayName = 'IconFingerprint';

export { IconFingerprint };
