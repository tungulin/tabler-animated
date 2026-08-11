'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const TOP_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: { y: -1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const BOTTOM_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: { y: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const LEFT_VARIANTS: Variants = {
  normal: { x: 0 },
  animate: { x: -1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const RIGHT_VARIANTS: Variants = {
  normal: { x: 0 },
  animate: { x: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const IconFrame = forwardRef<IconHandle, IconProps>(
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
          <motion.path animate={controls} initial='normal' d='M4 7l16 0' variants={TOP_VARIANTS} />
          <motion.path
            animate={controls}
            initial='normal'
            d='M4 17l16 0'
            variants={BOTTOM_VARIANTS}
          />
          <motion.path animate={controls} initial='normal' d='M7 4l0 16' variants={LEFT_VARIANTS} />
          <motion.path
            animate={controls}
            initial='normal'
            d='M17 4l0 16'
            variants={RIGHT_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconFrame.displayName = 'IconFrame';

export { IconFrame };
