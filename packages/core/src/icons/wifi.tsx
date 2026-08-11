'use client';

import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const WIFI_LEVELS = [
  { d: 'M12 18l.01 0', initialOpacity: 1, delay: 0 },
  { d: 'M9.172 15.172a4 4 0 0 1 5.656 0', initialOpacity: 1, delay: 0.1 },
  { d: 'M6.343 12.343a8 8 0 0 1 11.314 0', initialOpacity: 1, delay: 0.2 },
  { d: 'M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0', initialOpacity: 1, delay: 0.3 }
];

const IconWifi = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await controls.start('fadeOut');
          controls.start('fadeIn');
        },
        stopAnimation: () => controls.start('fadeIn')
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          await controls.start('fadeOut');
          controls.start('fadeIn');
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        controls.start('fadeIn');
        onMouseLeave?.(e);
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
          {WIFI_LEVELS.map((level, index) => (
            <motion.path
              key={level.d}
              animate={controls}
              d={level.d}
              initial={{ opacity: level.initialOpacity }}
              variants={{
                fadeOut: {
                  opacity: index === 0 ? 1 : 0,
                  transition: { duration: 0.2 }
                },
                fadeIn: {
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: level.delay
                  }
                }
              }}
            />
          ))}
        </svg>
      </div>
    );
  }
);

IconWifi.displayName = 'IconWifi';

export { IconWifi };
