'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const DRAG_DISTANCE = 3;
const DRAG_DURATION = 1.4;

// The column is dragged wider first, released, then the row is dragged taller.
const COLUMN_VARIANTS: Variants = {
  normal: {
    x: 0,
    transition: { duration: 0.2 }
  },
  animate: {
    x: [0, DRAG_DISTANCE, DRAG_DISTANCE, 0, 0],
    transition: {
      duration: DRAG_DURATION,
      times: [0, 0.18, 0.32, 0.5, 1],
      // pull, hold, snap back, idle
      ease: ['easeOut', 'linear', 'easeInOut', 'linear']
    }
  }
};

const ROW_VARIANTS: Variants = {
  normal: {
    y: 0,
    transition: { duration: 0.2 }
  },
  animate: {
    y: [0, 0, DRAG_DISTANCE, DRAG_DISTANCE, 0],
    transition: {
      duration: DRAG_DURATION,
      times: [0, 0.5, 0.68, 0.82, 1],
      // idle, pull, hold, snap back
      ease: ['linear', 'easeOut', 'linear', 'easeInOut']
    }
  }
};

const IconTable = forwardRef<IconHandle, IconProps>(
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
          <path d='M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14' />
          <motion.path animate={controls} initial='normal' d='M3 10h18' variants={ROW_VARIANTS} />
          <motion.path
            animate={controls}
            initial='normal'
            d='M10 3v18'
            variants={COLUMN_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconTable.displayName = 'IconTable';

export { IconTable };
