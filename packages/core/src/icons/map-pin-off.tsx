'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const SVG_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: { y: [0, -5, -3], transition: { duration: 0.5, times: [0, 0.6, 1] } }
};

const SLASH_VARIANTS: Variants = {
  normal: { opacity: 1, pathLength: 1 },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: { delay: 0.3, duration: 0.3, opacity: { duration: 0.1, delay: 0.3 } }
  }
};

const IconMapPinOff = forwardRef<IconHandle, IconProps>(
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
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
          animate={controls}
          initial='normal'
          variants={SVG_VARIANTS}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M9.442 9.432a3 3 0 0 0 4.113 4.134m1.445 -2.566a3 3 0 0 0 -3 -3' />
          <path d='M17.152 17.162l-3.738 3.738a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 0 1 -.476 -10.794m2.18 -1.82a8.003 8.003 0 0 1 10.91 10.912' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M3 3l18 18'
            variants={SLASH_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  }
);

IconMapPinOff.displayName = 'IconMapPinOff';

export { IconMapPinOff };
