'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const GAVEL_VARIANTS: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    rotate: [0, 15, -25, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.6, 0.8, 1],
      ease: ['easeInOut', 'easeOut', 'easeOut']
    }
  }
};

const IconGavel = forwardRef<IconHandle, IconProps>(
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
          style={{ transformOrigin: '0% 100%' }}
        >
          <motion.g animate={controls} variants={GAVEL_VARIANTS} initial='normal'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385' />
            <path d='M6 9l4 4' />
            <path d='M13 10l-4 -4' />
            <path d='M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0' />
          </motion.g>
          <path d='M3 21h7' />
        </svg>
      </div>
    );
  }
);

IconGavel.displayName = 'IconGavel';

export { IconGavel };
