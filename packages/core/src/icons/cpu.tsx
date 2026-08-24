'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const TRANSITION: Transition = { duration: 0.5, ease: 'easeInOut', repeat: 1 };

const Y_VARIANTS: Variants = {
  normal: { scaleY: 1, opacity: 1 },
  animate: { scaleY: [1, 1.2, 1], opacity: [1, 0.8, 1] }
};

const X_VARIANTS: Variants = {
  normal: { scaleX: 1, opacity: 1 },
  animate: { scaleX: [1, 1.2, 1], opacity: [1, 0.8, 1] }
};

const IconCpu = forwardRef<IconHandle, IconProps>(
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
          <path d='M5 6a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -12' />
          <path d='M9 9h6v6h-6l0 -6' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M3 10h2'
            transition={TRANSITION}
            variants={X_VARIANTS}
            style={{ transformOrigin: 'right' }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M3 14h2'
            transition={TRANSITION}
            variants={X_VARIANTS}
            style={{ transformOrigin: 'right' }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M10 3v2'
            transition={TRANSITION}
            variants={Y_VARIANTS}
            style={{ transformOrigin: 'bottom' }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M14 3v2'
            transition={TRANSITION}
            variants={Y_VARIANTS}
            style={{ transformOrigin: 'bottom' }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M21 10h-2'
            transition={TRANSITION}
            variants={X_VARIANTS}
            style={{ transformOrigin: 'left' }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M21 14h-2'
            transition={TRANSITION}
            variants={X_VARIANTS}
            style={{ transformOrigin: 'left' }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M14 21v-2'
            transition={TRANSITION}
            variants={Y_VARIANTS}
            style={{ transformOrigin: 'top' }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M10 21v-2'
            transition={TRANSITION}
            variants={Y_VARIANTS}
            style={{ transformOrigin: 'top' }}
          />
        </svg>
      </div>
    );
  }
);

IconCpu.displayName = 'IconCpu';

export { IconCpu };
