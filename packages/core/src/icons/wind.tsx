'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const PATH_VARIANTS: Variants = {
  normal: (custom: number) => ({
    pathLength: 1,
    opacity: 1,
    pathOffset: 0,
    transition: { duration: 0.3, ease: 'easeInOut', delay: custom }
  }),
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
    transition: { duration: 0.5, ease: 'easeInOut', delay: custom }
  })
};

const IconWind = forwardRef<IconHandle, IconProps>(
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
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <motion.path
            animate={controls}
            custom={0.2}
            initial='normal'
            d='M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24'
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={0}
            initial='normal'
            d='M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24'
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={0.4}
            initial='normal'
            d='M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24'
            variants={PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconWind.displayName = 'IconWind';

export { IconWind };
