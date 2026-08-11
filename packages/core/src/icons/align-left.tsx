'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const LINE_VARIANTS: Variants = {
  normal: { scaleX: 1 },
  animate: (custom: number) => ({
    scaleX: [1, 0.85, 1],
    transition: { duration: 0.4, delay: custom * 0.08, ease: 'easeInOut' }
  })
};

const IconAlignLeft = forwardRef<IconHandle, IconProps>(
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
          <motion.path
            animate={controls}
            custom={0}
            initial='normal'
            d='M4 6l16 0'
            style={{ originX: 0 }}
            variants={LINE_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={1}
            initial='normal'
            d='M4 12l10 0'
            style={{ originX: 0 }}
            variants={LINE_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={2}
            initial='normal'
            d='M4 18l14 0'
            style={{ originX: 0 }}
            variants={LINE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconAlignLeft.displayName = 'IconAlignLeft';

export { IconAlignLeft };
