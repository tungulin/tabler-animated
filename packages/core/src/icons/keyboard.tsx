'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const KEY_PATHS = [
  { d: 'M6 10l0 .01', delay: 0 },
  { d: 'M10 10l0 .01', delay: 0.04 },
  { d: 'M14 10l0 .01', delay: 0.08 },
  { d: 'M18 10l0 .01', delay: 0.12 },
  { d: 'M6 14l0 .01', delay: 0.16 },
  { d: 'M18 14l0 .01', delay: 0.2 },
  { d: 'M10 14l4 .01', delay: 0.24 }
];

const KEY_VARIANTS: Variants = {
  normal: { scale: 1 },
  animate: (delay: number) => ({
    scale: [1, 1.6, 1],
    transition: { duration: 0.3, delay, ease: 'easeOut' }
  })
};

const IconKeyboard = forwardRef<IconHandle, IconProps>(
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
          <path d='M2 8a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2l0 -8' />
          {KEY_PATHS.map((key) => (
            <motion.path
              key={key.d}
              animate={controls}
              custom={key.delay}
              initial='normal'
              d={key.d}
              variants={KEY_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconKeyboard.displayName = 'IconKeyboard';

export { IconKeyboard };
