'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const FRONT_PATH_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 160, damping: 17, mass: 1 }
  },
  animate: {
    x: -1,
    y: -1,
    transition: { type: 'spring', stiffness: 160, damping: 17, mass: 1 }
  }
};

const BACK_PATH_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 160, damping: 17, mass: 1 }
  },
  animate: {
    x: 3,
    y: 3,
    transition: { type: 'spring', stiffness: 160, damping: 17, mass: 1 }
  }
};

const IconCopy = forwardRef<IconHandle, IconProps>(
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
          <motion.path
            animate={controls}
            initial='normal'
            d='M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666'
            variants={FRONT_PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1'
            variants={BACK_PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconCopy.displayName = 'IconCopy';

export { IconCopy };
