'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

// The flap hinges on the fold line at y = 7, so flipping scaleY swings it up
// and over: on the way it flattens to a line, the way a real flap foreshortens
// as it passes through the horizontal.
const FLAP_VARIANTS: Variants = {
  normal: {
    scaleY: 1,
    transition: { duration: 0.25, ease: 'easeInOut' }
  },
  animate: {
    scaleY: [1, -1, -1, 1],
    transition: {
      duration: 1,
      times: [0, 0.35, 0.65, 1],
      // open, stay open, close
      ease: ['easeInOut', 'linear', 'easeInOut']
    }
  }
};

const IconMail = forwardRef<IconHandle, IconProps>(
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
          style={{ overflow: 'visible' }}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10' />
          <motion.path
            animate={controls}
            initial='normal'
            d='M3 7l9 6l9 -6'
            style={{ transformOrigin: '12px 7px' }}
            variants={FLAP_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconMail.displayName = 'IconMail';

export { IconMail };
