'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface ContrastIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ContrastIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANT: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 180,
    transformOrigin: 'left center',
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 12
    }
  }
};

const ContrastIcon = forwardRef<ContrastIconHandle, ContrastIconProps>(
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
          height={size}
          width={size}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
          <motion.path
            animate={controls}
            d='M12 17a5 5 0 0 0 0 -10v10'
            initial='normal'
            variants={PATH_VARIANT}
          />
        </svg>
      </div>
    );
  }
);

ContrastIcon.displayName = 'ContrastIcon';

export { ContrastIcon };
