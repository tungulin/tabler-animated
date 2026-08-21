'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const DOT_VARIANTS: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.8, 1],
    opacity: [1, 0.3, 1],
    transition: { duration: 0.6, ease: 'easeInOut' }
  }
};

const IconBluetoothConnected = forwardRef<IconHandle, IconProps>(
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
          <path d='M7 8l10 8l-5 4l0 -16l5 4l-10 8' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M4 12l1 0'
            variants={DOT_VARIANTS}
            style={{ transformOrigin: '4.5px 12px' }}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M18 12l1 0'
            variants={DOT_VARIANTS}
            style={{ transformOrigin: '18.5px 12px' }}
            transition={{ delay: 0.1 }}
          />
        </svg>
      </div>
    );
  }
);

IconBluetoothConnected.displayName = 'IconBluetoothConnected';

export { IconBluetoothConnected };
