'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const PLANE_VARIANTS: Variants = {
  normal: { x: 0, y: 0, scale: 1 },
  animate: {
    x: 3,
    y: -3,
    scale: 0.8
  }
};

const TRAIL_VARIANTS: Variants = {
  normal: {
    pathLength: 0,
    opacity: 0,
    translateX: -3,
    translateY: 3,
    transition: { duration: 0.3 }
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0
  }
};

const IconSend = forwardRef<IconHandle, IconProps>(
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
            transition={{ duration: 0.5 }}
            variants={PLANE_VARIANTS}
          >
            <path d='M10 14l11 -11' />
            <path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5' />
          </motion.g>
          <motion.path
            animate={controls}
            d='M -3 28 C -0.5 26.8 1.6 24.6 3.3 22 C 4.8 19.7 5.2 17.6 4.2 16.1 C 3.2 14.7 1.4 14.5 0.3 15.8 C -0.9 17.2 -0.6 19.4 1.2 20.4 C 3.4 21.5 6.4 19.4 9 15.8'
            fill='none'
            initial={{ opacity: 0, pathLength: 0 }}
            stroke='currentColor'
            strokeDasharray='2 2'
            strokeWidth='1'
            transition={{ duration: 0.55, delay: 0.1 }}
            variants={TRAIL_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconSend.displayName = 'IconSend';

export { IconSend };
