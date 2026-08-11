'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const DOT_PATHS = [
  'M8 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  'M8 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  'M8 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  'M14 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  'M14 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  'M14 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0'
];

const DOT_VARIANTS: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: (delay: number) => ({
    scale: [1, 1.4, 1],
    opacity: [1, 0.5, 1],
    transition: { duration: 0.35, delay, ease: 'easeInOut' }
  })
};

const IconGripVertical = forwardRef<IconHandle, IconProps>(
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
          {DOT_PATHS.map((d, index) => (
            <motion.path
              key={d}
              animate={controls}
              custom={(index % 3) * 0.06}
              initial='normal'
              d={d}
              variants={DOT_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconGripVertical.displayName = 'IconGripVertical';

export { IconGripVertical };
