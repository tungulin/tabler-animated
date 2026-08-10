'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const BODY_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.9, 1],
    transition: { duration: 0.4 }
  }
};

const TAIL_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    rotate: 0,
    transition: {
      duration: 0.3
    }
  },
  draw: {
    pathLength: [0, 1],
    rotate: 0,
    transition: {
      duration: 0.5
    }
  },
  wag: {
    pathLength: 1,
    rotate: [0, -15, 15, -10, 10, -5, 5],
    transition: {
      duration: 2.5,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY
    }
  }
};

const IconBrandGithub = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const bodyControls = useAnimation();
    const tailControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          bodyControls.start('animate');
          await tailControls.start('draw');
          tailControls.start('wag');
        },
        stopAnimation: () => {
          bodyControls.start('normal');
          tailControls.start('normal');
        }
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        console.log('onMouseEnter');
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          bodyControls.start('animate');
          await tailControls.start('draw');
          tailControls.start('wag');
        }
      },
      [bodyControls, tailControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          bodyControls.start('normal');
          tailControls.start('normal');
        }
      },
      [bodyControls, tailControls, onMouseLeave]
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
            animate={bodyControls}
            initial='normal'
            d='M15 21v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5'
            variants={BODY_VARIANTS}
          />
          <motion.path
            animate={tailControls}
            initial='normal'
            d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3'
            variants={TAIL_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconBrandGithub.displayName = 'IconBrandGithub';

export { IconBrandGithub };
