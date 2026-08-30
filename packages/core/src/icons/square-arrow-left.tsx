'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const HEAD_VARIANTS: Variants = {
  normal: { translateX: 0, opacity: 1 },
  animate: {
    translateX: [0, 3, 0],
    transition: { duration: 0.4 }
  }
};

const SHAFT_VARIANTS: Variants = {
  normal: { d: 'M16 12h-8', opacity: 1 },
  animate: {
    d: ['M16 12h-8', 'M16 12h-5', 'M16 12h-8'],
    transition: { duration: 0.4 }
  }
};

const IconSquareArrowLeft = forwardRef<IconHandle, IconProps>(
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
          <path d='M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M12 8l-4 4l4 4'
            variants={HEAD_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M16 12h-8'
            variants={SHAFT_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconSquareArrowLeft.displayName = 'IconSquareArrowLeft';

export { IconSquareArrowLeft };
