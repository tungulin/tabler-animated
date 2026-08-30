'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const PATH_VARIANTS: Variants = {
  normal: {
    strokeWidth: 2
  },
  animate: {
    strokeWidth: 1
  }
};

const PARTS = [
  'M1 8h22v7h-12v2h-4v-2h-6l0 -7',
  'M7 8v7',
  'M14 8v7',
  'M17 11v4',
  'M4 11v4',
  'M11 11v1',
  'M20 11v4'
];

const IconBrandNpm = forwardRef<IconHandle, IconProps>(
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
          {PARTS.map((d) => (
            <motion.path
              key={d}
              animate={controls}
              initial='normal'
              d={d}
              transition={{ duration: 0.6 }}
              variants={PATH_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconBrandNpm.displayName = 'IconBrandNpm';

export { IconBrandNpm };
