'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const DURATION = 0.3;
const CALCULATE_DELAY = (i: number) => (i === 0 ? 0.1 : i * DURATION + 0.1);

const CURVE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: DURATION * 2, opacity: { duration: 0.1 } }
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
    transition: { duration: DURATION * 2, opacity: { duration: 0.1 } }
  }
};

const TICK_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: CALCULATE_DELAY(1),
      duration: DURATION,
      opacity: { duration: 0.1, delay: CALCULATE_DELAY(1) }
    }
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: CALCULATE_DELAY(1),
      duration: DURATION,
      opacity: { duration: 0.1, delay: CALCULATE_DELAY(1) }
    }
  }
};

const CIRCLE_VARIANTS: Variants = {
  normal: {
    pathLength: 1.1,
    opacity: 1,
    transition: { delay: 0 }
  },
  animate: {
    pathLength: [0, 1.1],
    opacity: [0, 1],
    transition: {
      delay: CALCULATE_DELAY(1),
      duration: DURATION,
      opacity: { delay: CALCULATE_DELAY(1) }
    }
  }
};

const EaseInOutControlPointsIcon = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          <motion.circle
            animate={controls}
            initial='normal'
            cx='20'
            cy='20'
            r='2'
            variants={CIRCLE_VARIANTS}
          />
          <motion.path animate={controls} initial='normal' d='M17 20h-2' variants={TICK_VARIANTS} />
          <motion.circle
            animate={controls}
            initial='normal'
            cx='4'
            cy='4'
            r='2'
            variants={CIRCLE_VARIANTS}
          />
          <motion.path animate={controls} initial='normal' d='M7 4h2' variants={TICK_VARIANTS} />
          <motion.path animate={controls} initial='normal' d='M14 4h-2' variants={TICK_VARIANTS} />
          <motion.path animate={controls} initial='normal' d='M12 20h-2' variants={TICK_VARIANTS} />
          <motion.path
            animate={controls}
            initial='normal'
            d='M3 20c8 0 10 -16 18 -16'
            variants={CURVE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

EaseInOutControlPointsIcon.displayName = 'EaseInOutControlPoints';

export { EaseInOutControlPointsIcon };
