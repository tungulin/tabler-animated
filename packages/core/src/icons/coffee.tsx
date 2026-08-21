'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const STEAM_VARIANTS: Variants = {
  normal: { y: 0, opacity: 1 },
  animate: {
    y: [0, -2, 0],
    opacity: [1, 0.3, 1],
    transition: { duration: 0.8, ease: 'easeInOut' }
  }
};

const IconCoffee = forwardRef<IconHandle, IconProps>(
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
          <path d='M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'
            variants={STEAM_VARIANTS}
          />
          <motion.path
            animate={controls}
            initial='normal'
            d='M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'
            variants={STEAM_VARIANTS}
            transition={{ delay: 0.15 }}
          />
          <path d='M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5' />
          <path d='M16.746 16.726a3 3 0 1 0 .252 -5.555' />
        </svg>
      </div>
    );
  }
);

IconCoffee.displayName = 'IconCoffee';

export { IconCoffee };
