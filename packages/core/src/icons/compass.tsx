'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const NEEDLE_VARIANTS: Variants = {
  normal: {
    rotate: 0
  },
  animate: {
    rotate: 360
  }
};

const IconCompass = forwardRef<IconHandle, IconProps>(
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
          <path d='M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
          <path d='M12 3l0 2' />
          <path d='M12 19l0 2' />
          <path d='M3 12l2 0' />
          <path d='M19 12l2 0' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M8 16l2 -6l6 -2l-2 6l-6 2'
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 15
            }}
            variants={NEEDLE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconCompass.displayName = 'IconCompass';

export { IconCompass };
