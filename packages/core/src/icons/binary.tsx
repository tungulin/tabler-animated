'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const FLIP_DURATION = 0.12;
const FLIP_STAGGER = 0.06;

const FLIP_VARIANTS: Variants = {
  normal: (custom: number) => ({
    rotateX: 0,
    opacity: 1,
    transition: { duration: FLIP_DURATION, delay: custom * FLIP_STAGGER + FLIP_DURATION }
  }),
  animate: (custom: number) => ({
    rotateX: [0, -90, 0],
    opacity: [1, 0, 1],
    transition: { duration: FLIP_DURATION * 2, delay: custom * FLIP_STAGGER }
  })
};

const PARTS = [
  { d: 'M11 10v-5h-1m8 14v-5h-1', custom: 0 },
  {
    d: 'M15 5.5a.5 .5 0 0 1 .5 -.5h2a.5 .5 0 0 1 .5 .5v4a.5 .5 0 0 1 -.5 .5h-2a.5 .5 0 0 1 -.5 -.5l0 -4',
    custom: 1
  },
  {
    d: 'M10 14.5a.5 .5 0 0 1 .5 -.5h2a.5 .5 0 0 1 .5 .5v4a.5 .5 0 0 1 -.5 .5h-2a.5 .5 0 0 1 -.5 -.5l0 -4',
    custom: 2
  },
  { d: 'M6 10h.01m-.01 9h.01', custom: 3 }
];

const IconBinary = forwardRef<IconHandle, IconProps>(
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
          {PARTS.map((part) => (
            <motion.path
              key={part.d}
              animate={controls}
              custom={part.custom}
              initial='normal'
              d={part.d}
              variants={FLIP_VARIANTS}
              style={{ transformOrigin: 'center' }}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconBinary.displayName = 'IconBinary';

export { IconBinary };
