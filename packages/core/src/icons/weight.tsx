'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const WEIGHT_VARIANTS: Variants = {
  normal: {
    y: 0,
    scaleX: 1,
    scaleY: 1,
    transition: { duration: 0.2 }
  },
  animate: {
    y: [0, -4, 0, 0, -0.8, 0, 0],
    scaleY: [1, 1, 1, 0.86, 1.03, 0.99, 1],
    scaleX: [1, 1, 1, 1.1, 0.98, 1.01, 1],
    transition: {
      duration: 0.9,
      times: [0, 0.3, 0.42, 0.5, 0.64, 0.78, 1],
      ease: ['easeOut', 'easeIn', 'easeOut', 'easeOut', 'easeIn', 'easeOut']
    }
  }
};

const IconWeight = forwardRef<IconHandle, IconProps>(
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
          style={{ overflow: 'visible' }}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <motion.g
            animate={controls}
            initial='normal'
            style={{ transformOrigin: '12px 20px' }}
            variants={WEIGHT_VARIANTS}
          >
            <path d='M9 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
            <path d='M6.835 9h10.33a1 1 0 0 1 .984 .821l1.637 9a1 1 0 0 1 -.984 1.179h-13.604a1 1 0 0 1 -.984 -1.179l1.637 -9a1 1 0 0 1 .984 -.821' />
          </motion.g>
        </svg>
      </div>
    );
  }
);

IconWeight.displayName = 'IconWeight';

export { IconWeight };
