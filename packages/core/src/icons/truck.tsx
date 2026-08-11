'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const TRUCK_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [0, -1, 0, -0.5, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'loop'
    }
  }
};

const SPEED_LINE_VARIANTS: Variants = {
  normal: {
    opacity: 0,
    x: 0,
    scaleX: 0
  },
  animate: (custom: number) => ({
    opacity: [0, 0.7, 0.5, 0],
    x: [0, -4, -10, -16],
    scaleX: [0.2, 1, 0.8, 0.3],
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      repeat: Number.POSITIVE_INFINITY,
      delay: custom * 0.08,
      times: [0, 0.2, 0.6, 1]
    }
  })
};

const SPEED_LINES = [
  { y: 8, width: 5, x: 0 },
  { y: 11, width: 7, x: -1 },
  { y: 14, width: 4, x: 0 }
];

const IconTruck = forwardRef<IconHandle, IconProps>(
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
        if (!isControlledRef.current) {
          controls.start('animate');
        }
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        }
        onMouseLeave?.(e);
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
          style={{ overflow: 'visible' }}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          {SPEED_LINES.map((line, i) => (
            <motion.line
              key={`speed-${i}`}
              animate={controls}
              custom={i}
              initial='normal'
              strokeLinecap='round'
              strokeWidth='2'
              variants={SPEED_LINE_VARIANTS}
              x1={line.x}
              x2={line.x + line.width}
              y1={line.y}
              y2={line.y}
            />
          ))}
          <motion.g animate={controls} initial='normal' variants={TRUCK_VARIANTS}>
            <path d='M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5' />
          </motion.g>
          <motion.g animate={controls} initial='normal' variants={TRUCK_VARIANTS}>
            <path d='M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
          </motion.g>
          <motion.g animate={controls} initial='normal' variants={TRUCK_VARIANTS}>
            <path d='M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
          </motion.g>
        </svg>
      </div>
    );
  }
);

IconTruck.displayName = 'IconTruck';

export { IconTruck };
