'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const PATH_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (custom: number) => ({
    opacity: [0, 1],
    transition: { delay: custom * 0.1, duration: 0.3 }
  })
};

const DASHES = [
  'M8.56 3.69a9 9 0 0 0 -2.92 1.95',
  'M3.69 8.56a9 9 0 0 0 -.69 3.44',
  'M3.69 15.44a9 9 0 0 0 1.95 2.92',
  'M8.56 20.31a9 9 0 0 0 3.44 .69',
  'M15.44 20.31a9 9 0 0 0 2.92 -1.95',
  'M20.31 15.44a9 9 0 0 0 .69 -3.44',
  'M20.31 8.56a9 9 0 0 0 -1.95 -2.92',
  'M15.44 3.69a9 9 0 0 0 -3.44 -.69'
];

const IconCircleDashed = forwardRef<IconHandle, IconProps>(
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
          {DASHES.map((d, index) => (
            <motion.path
              key={d}
              animate={controls}
              custom={index}
              initial='normal'
              d={d}
              variants={PATH_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconCircleDashed.displayName = 'IconCircleDashed';

export { IconCircleDashed };
