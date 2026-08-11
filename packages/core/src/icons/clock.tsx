'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const HOUR_HAND_TRANSITION: Transition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1]
};

const HOUR_HAND_VARIANTS: Variants = {
  normal: {
    rotate: 0
  },
  animate: {
    rotate: 360
  }
};

const MINUTE_HAND_TRANSITION: Transition = {
  duration: 0.5,
  ease: 'easeInOut'
};

const MINUTE_HAND_VARIANTS: Variants = {
  normal: {
    rotate: 0
  },
  animate: {
    rotate: 45
  }
};

const IconClock = forwardRef<IconHandle, IconProps>(
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
          <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M12 12L12 7'
            style={{ originX: '0%', originY: '100%' }}
            transition={HOUR_HAND_TRANSITION}
            variants={HOUR_HAND_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M12 12L15 15'
            style={{ originX: '0%', originY: '0%' }}
            transition={MINUTE_HAND_TRANSITION}
            variants={MINUTE_HAND_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconClock.displayName = 'IconClock';

export { IconClock };
