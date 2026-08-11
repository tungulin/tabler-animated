'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const CIRCLE_TRANSITION: Transition = {
  duration: 0.3,
  delay: 0.1,
  opacity: { delay: 0.15 }
};

const CIRCLE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1]
  }
};

const PATH_TRANSITION: Transition = {
  duration: 0.7,
  delay: 0.5,
  opacity: { delay: 0.5 }
};

const PATH_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    pathOffset: 0
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0]
  }
};

const IconRoute = forwardRef<IconHandle, IconProps>(
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
            d='M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0'
            transition={CIRCLE_TRANSITION}
            variants={CIRCLE_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4'
            transition={CIRCLE_TRANSITION}
            variants={CIRCLE_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5'
            transition={PATH_TRANSITION}
            variants={PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconRoute.displayName = 'IconRoute';

export { IconRoute };
