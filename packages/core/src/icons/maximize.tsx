'use client';

import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const TRANSITION = { duration: 0.35, ease: 'easeInOut' as const };

const IconMaximize = forwardRef<IconHandle, IconProps>(
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
            d='M4 8v-2a2 2 0 0 1 2 -2h2'
            variants={{ normal: { x: 0, y: 0 }, animate: { x: -2, y: -2, transition: TRANSITION } }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M4 16v2a2 2 0 0 0 2 2h2'
            variants={{ normal: { x: 0, y: 0 }, animate: { x: -2, y: 2, transition: TRANSITION } }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M16 4h2a2 2 0 0 1 2 2v2'
            variants={{ normal: { x: 0, y: 0 }, animate: { x: 2, y: -2, transition: TRANSITION } }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M16 20h2a2 2 0 0 0 2 -2v-2'
            variants={{ normal: { x: 0, y: 0 }, animate: { x: 2, y: 2, transition: TRANSITION } }}
          />
        </svg>
      </div>
    );
  }
);

IconMaximize.displayName = 'IconMaximize';

export { IconMaximize };
