'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const CAPSULE_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -3, 0, -2, 0],
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  }
};

const IconMicrophone = forwardRef<IconHandle, IconProps>(
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
          <path d='M5 10a7 7 0 0 0 14 0' />
          <path d='M8 21l8 0' />
          <path d='M12 17l0 4' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M9 5a3 3 0 0 1 3 -3a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3a3 3 0 0 1 -3 -3l0 -5'
            variants={CAPSULE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconMicrophone.displayName = 'IconMicrophone';

export { IconMicrophone };
