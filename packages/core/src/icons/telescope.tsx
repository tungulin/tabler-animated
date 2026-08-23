'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const SCOPE_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  },
  animate: {
    rotate: -13,
    transition: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

const IconTelescope = forwardRef<IconHandle, IconProps>(
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
          <motion.g
            animate={controls}
            style={{ transformOrigin: '12px 13px' }}
            variants={SCOPE_VARIANTS}
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M3.294 13.678l.166 .281c.52 .88 1.624 1.265 2.605 .91l14.242 -5.165a1.023 1.023 0 0 0 .565 -1.456l-2.62 -4.705a1.087 1.087 0 0 0 -1.447 -.42l-.056 .032l-12.694 7.618c-1.02 .613 -1.357 1.897 -.76 2.905l-.001 0' />
            <path d='M14 5l3 5.5' />
          </motion.g>
          <path d='M6 21l6 -5l6 5' />
          <path d='M12 13v8' />
        </svg>
      </div>
    );
  }
);

IconTelescope.displayName = 'IconTelescope';

export { IconTelescope };
