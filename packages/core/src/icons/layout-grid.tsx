'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const TRANSITION = { duration: 0.8, ease: 'easeInOut' as const, times: [0, 0.4, 0.6, 1] };

const TOP_LEFT_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: { x: [0, 11, 11, 0], y: [0, 0, 0, 0], transition: TRANSITION }
};

const TOP_RIGHT_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: { x: [0, 0, 0, 0], y: [0, 11, 11, 0], transition: TRANSITION }
};

const BOTTOM_RIGHT_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: { x: [0, -11, -11, 0], y: [0, 0, 0, 0], transition: TRANSITION }
};

const BOTTOM_LEFT_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: { x: [0, 0, 0, 0], y: [0, -11, -11, 0], transition: TRANSITION }
};

const IconLayoutGrid = forwardRef<IconHandle, IconProps>(
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
            initial='normal'
            d='M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4'
            variants={TOP_LEFT_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4'
            variants={TOP_RIGHT_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4'
            variants={BOTTOM_RIGHT_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4'
            variants={BOTTOM_LEFT_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconLayoutGrid.displayName = 'IconLayoutGrid';

export { IconLayoutGrid };
