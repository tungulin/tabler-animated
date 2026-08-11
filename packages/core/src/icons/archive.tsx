'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const LID_VARIANTS: Variants = {
  normal: {
    y: 0,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 200,
      damping: 25
    }
  },
  animate: {
    y: -1.5,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 200,
      damping: 25
    }
  }
};

const BOX_VARIANTS: Variants = {
  normal: { d: 'M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10' },
  animate: { d: 'M5 11v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10' }
};

const HANDLE_VARIANTS: Variants = {
  normal: { d: 'M10 12l4 0' },
  animate: { d: 'M10 15l4 0' }
};

const IconArchive = forwardRef<IconHandle, IconProps>(
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
            d='M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2'
            variants={LID_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10'
            variants={BOX_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M10 12l4 0'
            variants={HANDLE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconArchive.displayName = 'IconArchive';

export { IconArchive };
