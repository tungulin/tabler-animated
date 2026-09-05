'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const DASH_LENGTH = 60;
const DRAW_DURATION = 0.45;
const DOT_STAGGER = 0.08;

const DOTS = [
  'M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  'M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  'M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0'
];

const OUTLINE_VARIANTS: Variants = {
  normal: {
    strokeDashoffset: 0
  },
  animate: {
    strokeDashoffset: [DASH_LENGTH, 0],
    transition: {
      duration: DRAW_DURATION,
      ease: [0.65, 0, 0.35, 1]
    }
  }
};

const DOTS_GROUP_VARIANTS: Variants = {
  normal: {},
  animate: {
    transition: {
      delayChildren: DRAW_DURATION,
      staggerChildren: DOT_STAGGER
    }
  }
};

const DOT_VARIANTS: Variants = {
  normal: {
    scale: 1,
    transition: { duration: 0.2 }
  },
  animate: {
    scale: [0, 1],
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10
    }
  }
};

const IconPalette = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const isAnimatingRef = useRef(false);

    const startAnimation = useCallback(async () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      try {
        await controls.start('animate');
      } finally {
        isAnimatingRef.current = false;
      }
    }, [controls]);

    const stopAnimation = useCallback(async () => {
      isAnimatingRef.current = false;
      await controls.start('normal');
    }, [controls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return { startAnimation, stopAnimation };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          startAnimation();
        }
      },
      [startAnimation, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          stopAnimation();
        }
      },
      [stopAnimation, onMouseLeave]
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
            initial='normal'
            d='M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25'
            strokeDasharray={DASH_LENGTH}
            variants={OUTLINE_VARIANTS}
          />
          <motion.g animate={controls} initial='normal' variants={DOTS_GROUP_VARIANTS}>
            {DOTS.map((d) => (
              <motion.path
                key={d}
                d={d}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                variants={DOT_VARIANTS}
              />
            ))}
          </motion.g>
        </svg>
      </div>
    );
  }
);

IconPalette.displayName = 'IconPalette';

export { IconPalette };
