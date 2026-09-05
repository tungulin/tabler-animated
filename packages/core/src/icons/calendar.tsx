'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

// Seconds per user unit of stroke, so the short serif and the long stem are
// drawn at the same pen speed instead of the same duration.
const DRAW_SPEED = 0.15;

interface NumeralPart {
  d: string;
  length: number;
  delay: number;
}

// The "1" in the calendar body, written the way it is by hand: serif first,
// then the stem downwards.
const NUMERAL_PARTS: NumeralPart[] = [
  { d: 'M11 15h1', length: 1, delay: 0 },
  { d: 'M12 15v3', length: 3, delay: 0.12 }
];

const NUMERAL_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.2 }
  },
  animate: (custom: NumeralPart) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      pathLength: {
        duration: custom.length * DRAW_SPEED,
        delay: custom.delay,
        ease: 'easeOut'
      },
      opacity: { duration: 0.1, delay: custom.delay }
    }
  })
};

const IconCalendar = forwardRef<IconHandle, IconProps>(
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
          <path d='M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12' />
          <path d='M16 3v4' />
          <path d='M8 3v4' />
          <path d='M4 11h16' />
          {NUMERAL_PARTS.map((part) => (
            <motion.path
              key={part.d}
              animate={controls}
              custom={part}
              initial='normal'
              d={part.d}
              variants={NUMERAL_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconCalendar.displayName = 'IconCalendar';

export { IconCalendar };
