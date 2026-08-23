'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const LINE_VARIANTS: Variants = {
  normal: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  animate: (custom: number) => ({
    x: [0, custom * 1, 0],
    opacity: 1,
    transition: {
      x: {
        duration: 0.6,
        repeat: 1,
        ease: 'easeInOut',
        delay: custom * 0.1
      }
    }
  })
};

const LINES = [
  { d: 'M21 4l-18 0', custom: 2 },
  { d: 'M6 8l14 0', custom: -2 },
  { d: 'M4 12l12 0', custom: 2 },
  { d: 'M13 16l-6 0', custom: -1.5 },
  { d: 'M11 20l4 0', custom: 1 }
];

const IconTornado = forwardRef<IconHandle, IconProps>(
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
          {LINES.map((line) => (
            <motion.path
              key={line.d}
              animate={controls}
              custom={line.custom}
              initial='normal'
              d={line.d}
              variants={LINE_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconTornado.displayName = 'IconTornado';

export { IconTornado };
