'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const SVG_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1
  },
  animate: {
    rotate: [-3, 1, -2, 0],
    scale: [0.95, 1.05, 0.98, 1]
  }
};

const SHACKLE_VARIANTS: Variants = {
  normal: {
    pathLength: 1
  },
  animate: {
    pathLength: 0.7
  }
};

const IconLock = forwardRef<IconHandle, IconProps>(
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
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          width={size}
          height={size}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          animate={controls}
          initial='normal'
          variants={SVG_VARIANTS}
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6' />
          <path d='M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M8 11v-4a4 4 0 1 1 8 0v4'
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            variants={SHACKLE_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  }
);

IconLock.displayName = 'IconLock';

export { IconLock };
