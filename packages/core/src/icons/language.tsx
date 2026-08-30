'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const STAGGER = 0.1;

const PATH_VARIANTS: Variants = {
  normal: { opacity: 1, pathLength: 1, pathOffset: 0 },
  animate: (custom: number) => ({
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      opacity: { duration: 0.01, delay: custom * STAGGER },
      pathLength: {
        type: 'spring',
        duration: 0.5,
        bounce: 0,
        delay: custom * STAGGER
      }
    }
  })
};

const PARTS = [
  { d: 'M6.694 3l.793 .582', custom: 0 },
  { d: 'M4 6.371h7', custom: 1 },
  { d: 'M9 6.371c0 4.418 -2.239 6.629 -5 6.629', custom: 2 },
  { d: 'M5 9c0 2.144 2.252 3.908 6 4', custom: 3 },
  { d: 'M12 20l4 -9l4 9', custom: 3 },
  { d: 'M19.1 18h-6.2', custom: 3 }
];

const IconLanguage = forwardRef<IconHandle, IconProps>(
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
          {PARTS.map((part) => (
            <motion.path
              key={part.d}
              animate={controls}
              custom={part.custom}
              initial='normal'
              d={part.d}
              variants={PATH_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconLanguage.displayName = 'IconLanguage';

export { IconLanguage };
