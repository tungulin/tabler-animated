'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const PHONE_CALL_VARIANTS: Variants = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [10, 20, -10, 10, 0],
    scale: [1, 1.1, 1.2, 1.1, 1],
    transition: { duration: 0.9, ease: 'easeInOut' }
  }
};

const PATH_VARIANTS: Variants = {
  normal: { opacity: 1, transition: { duration: 0.4 } },
  fadeOut: { opacity: 0, transition: { duration: 0.3 } },
  fadeIn: (i: number) => ({
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 }
  })
};

const IconPhoneCall = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const svgControls = useAnimation();
    const pathControls = useAnimation();
    const isControlledRef = useRef(false);

    const runPathIntro = useCallback(async () => {
      await pathControls.start('fadeOut');
      pathControls.start('fadeIn');
    }, [pathControls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await Promise.all([svgControls.start('animate'), runPathIntro()]);
        },
        stopAnimation: () => {
          svgControls.start('normal');
          pathControls.start('normal');
        }
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          await Promise.all([svgControls.start('animate'), runPathIntro()]);
        }
      },
      [onMouseEnter, runPathIntro, svgControls]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          svgControls.start('normal');
          pathControls.start('normal');
        }
      },
      [onMouseLeave, pathControls, svgControls]
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
          animate={svgControls}
          initial='normal'
          variants={PHONE_CALL_VARIANTS}
          style={{ overflow: 'visible' }}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
          <motion.path
            animate={pathControls}
            custom={1}
            initial={{ opacity: 1 }}
            d='M15 7a2 2 0 0 1 2 2'
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate={pathControls}
            custom={2}
            initial={{ opacity: 1 }}
            d='M15 3a6 6 0 0 1 6 6'
            variants={PATH_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  }
);

IconPhoneCall.displayName = 'IconPhoneCall';

export { IconPhoneCall };
