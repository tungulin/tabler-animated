'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const CIRCLE_TRANSITION: Transition = {
  duration: 0.3,
  delay: 0.1,
  opacity: { delay: 0.15 }
};

const CIRCLE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1]
  }
};

const GRID_TRANSITION: Transition = {
  duration: 0.7,
  delay: 0.5,
  opacity: { delay: 0.5 }
};

const GRID_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    pathOffset: 0
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0]
  }
};

const GRID_PARTS = [
  'M3.6 9h16.8',
  'M3.6 15h16.8',
  'M11.5 3a17 17 0 0 0 0 18',
  'M12.5 3a17 17 0 0 1 0 18'
];

const IconWorld = forwardRef<IconHandle, IconProps>(
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
            d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0'
            transition={CIRCLE_TRANSITION}
            variants={CIRCLE_VARIANTS}
          />
          {GRID_PARTS.map((d) => (
            <motion.path
              key={d}
              animate={controls}
              initial='normal'
              d={d}
              transition={GRID_TRANSITION}
              variants={GRID_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconWorld.displayName = 'IconWorld';

export { IconWorld };
