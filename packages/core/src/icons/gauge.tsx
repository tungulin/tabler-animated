'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const DEFAULT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 160,
  damping: 17,
  mass: 1
};

const NEEDLE_VARIANTS: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: 1,
    rotate: 40,
    translateY: 2
  }
};

const IconGauge = forwardRef<IconHandle, IconProps>(
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
          <path d='M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
          <path d='M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
          <motion.path
            transition={DEFAULT_TRANSITION}
            animate={controls}
            initial='normal'
            d='M13.41 10.59l2.59 -2.59'
            variants={NEEDLE_VARIANTS}
          />
          <motion.path
            transition={DEFAULT_TRANSITION}
            animate={controls}
            initial='normal'
            d='M7 12a5 5 0 0 1 5 -5'
            variants={NEEDLE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconGauge.displayName = 'IconGauge';

export { IconGauge };
