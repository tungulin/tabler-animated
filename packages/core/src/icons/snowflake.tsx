'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const SVG_VARIANTS: Variants = {
  normal: {
    rotate: 0
  },
  animate: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
  }
};

const IconSnowflake = forwardRef<IconHandle, IconProps>(
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
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          width={size}
          height={size}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
          animate={controls}
          initial='normal'
          variants={SVG_VARIANTS}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M10 4l2 1l2 -1' />
          <path d='M12 2v6.5l3 1.72' />
          <path d='M17.928 6.268l.134 2.232l1.866 1.232' />
          <path d='M20.66 7l-5.629 3.25l.01 3.458' />
          <path d='M19.928 14.268l-1.866 1.232l-.134 2.232' />
          <path d='M20.66 17l-5.629 -3.25l-2.99 1.738' />
          <path d='M14 20l-2 -1l-2 1' />
          <path d='M12 22v-6.5l-3 -1.72' />
          <path d='M6.072 17.732l-.134 -2.232l-1.866 -1.232' />
          <path d='M3.34 17l5.629 -3.25l-.01 -3.458' />
          <path d='M4.072 9.732l1.866 -1.232l.134 -2.232' />
          <path d='M3.34 7l5.629 3.25l2.99 -1.738' />
        </motion.svg>
      </div>
    );
  }
);

IconSnowflake.displayName = 'IconSnowflake';

export { IconSnowflake };
