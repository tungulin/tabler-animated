'use client';

import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const DURATION = 0.3;
const CALCULATE_DELAY = (i: number) => (i === 0 ? 0.1 : i * DURATION + 0.1);

const DOT_VARIANTS = {
  normal: { pathLength: 1.1, opacity: 1, transition: { delay: 0 } },
  animate: { pathLength: [0, 1.1], opacity: [0, 1] }
};

const LINE_VARIANTS = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { delay: 0 } },
  animate: { pathLength: [0, 1], opacity: [0, 1], pathOffset: [1, 0] }
};

const IconGitBranch = forwardRef<IconHandle, IconProps>(
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
            d='M5 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'
            transition={{ duration: DURATION, delay: CALCULATE_DELAY(0) }}
            variants={DOT_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M5 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'
            transition={{ duration: DURATION, delay: CALCULATE_DELAY(2) }}
            variants={DOT_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M15 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'
            transition={{ duration: DURATION, delay: CALCULATE_DELAY(2) }}
            variants={DOT_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M7 8l0 8'
            transition={{ duration: DURATION, delay: CALCULATE_DELAY(1) }}
            variants={LINE_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M9 18h6a2 2 0 0 0 2 -2v-5'
            transition={{ duration: DURATION, delay: CALCULATE_DELAY(1) }}
            variants={LINE_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M14 14l3 -3l3 3'
            transition={{ duration: DURATION, delay: CALCULATE_DELAY(1) }}
            variants={LINE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconGitBranch.displayName = 'IconGitBranch';

export { IconGitBranch };
