'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const STEAM_VARIANTS: Variants = {
  normal: { y: 0, opacity: 1 },
  animate: (custom: number) => ({
    y: -3,
    opacity: [0, 1, 0],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 1.5,
      ease: 'easeInOut',
      delay: 0.2 * custom
    }
  })
};

const IconSoup = forwardRef<IconHandle, IconProps>(
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
          style={{ overflow: 'visible' }}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1' />
          <motion.path
            animate={controls}
            custom={0}
            initial='normal'
            d='M12 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'
            variants={STEAM_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={0.2}
            initial='normal'
            d='M16 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'
            variants={STEAM_VARIANTS}
          />
          <motion.path
            animate={controls}
            custom={0.4}
            initial='normal'
            d='M8 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'
            variants={STEAM_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconSoup.displayName = 'IconSoup';

export { IconSoup };
