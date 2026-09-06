'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const NODE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: 0.15 * custom,
      opacity: { delay: 0.1 * custom }
    }
  })
};

// The three nodes appear together, then each connector is drawn towards its target.
const PARTS = [
  { d: 'M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0', custom: 0 },
  { d: 'M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0', custom: 0 },
  { d: 'M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0', custom: 0 },
  { d: 'M8.7 10.7l6.6 -3.4', custom: 1 },
  { d: 'M8.7 13.3l6.6 3.4', custom: 2 }
];

const IconShare = forwardRef<IconHandle, IconProps>(
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
          {PARTS.map((part) => (
            <motion.path
              key={part.d}
              animate={controls}
              custom={part.custom}
              initial='normal'
              d={part.d}
              variants={NODE_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconShare.displayName = 'IconShare';

export { IconShare };
