'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const SVG_VARIANTS: Variants = {
  normal: { scale: 1, strokeWidth: 2 },
  animate: {
    scale: [1, 1.08, 1],
    strokeWidth: [2, 2.25, 2],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }
  }
};

const PULSE_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0 },
  animate: {
    pathLength: [1, 0.8, 1],
    pathOffset: [0, 0.1, 0],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }
  }
};

const PATHS = [
  'M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8',
  'M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8',
  'M17.5 16a3.5 3.5 0 0 0 0 -7h-.5',
  'M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0',
  'M6.5 16a3.5 3.5 0 0 1 0 -7h.5',
  'M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10'
];

const IconBrain = forwardRef<IconHandle, IconProps>(
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
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          width={size}
          height={size}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          animate={controls}
          initial='normal'
          variants={SVG_VARIANTS}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          {PATHS.map((d) => (
            <motion.path
              key={d}
              animate={controls}
              initial='normal'
              d={d}
              variants={PULSE_VARIANTS}
            />
          ))}
        </motion.svg>
      </div>
    );
  }
);

IconBrain.displayName = 'IconBrain';

export { IconBrain };
