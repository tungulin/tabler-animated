'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const LID_TRANSITION: Transition = {
  duration: 0.2,
  type: 'spring',
  stiffness: 200,
  damping: 25
};

const LID_VARIANTS: Variants = {
  normal: {
    translateY: 0,
    transition: LID_TRANSITION
  },
  animate: {
    translateY: -1.5,
    transition: LID_TRANSITION
  }
};

const BIN_VARIANTS: Variants = {
  normal: { d: 'M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' },
  animate: { d: 'M5 9l1 10a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -10' }
};

const LEFT_LINE_VARIANTS: Variants = {
  normal: { d: 'M10 11l0 6' },
  animate: { d: 'M10 12l0 6' }
};

const RIGHT_LINE_VARIANTS: Variants = {
  normal: { d: 'M14 11l0 6' },
  animate: { d: 'M14 12l0 6' }
};

const IconTrash = forwardRef<IconHandle, IconProps>(
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
          <motion.g animate={controls} initial='normal' variants={LID_VARIANTS}>
            <path d='M4 7l16 0' />
            <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
          </motion.g>
          <motion.path
            animate={controls}
            initial='normal'
            d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12'
            variants={BIN_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M10 11l0 6'
            variants={LEFT_LINE_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M14 11l0 6'
            variants={RIGHT_LINE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconTrash.displayName = 'IconTrash';

export { IconTrash };
