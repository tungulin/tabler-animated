'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -10, 10, -6, 0],
    transition: {
      ease: 'circIn',
      rotate: {
        duration: 0.5
      }
    }
  }
};

const IconBone = forwardRef<IconHandle, IconProps>(
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
          <motion.path
            animate={controls}
            initial='normal'
            d='M15 3a3 3 0 0 1 3 3a3 3 0 1 1 -2.12 5.122l-4.758 4.758a3 3 0 1 1 -5.117 2.297l0 -.177l-.176 0a3 3 0 1 1 2.298 -5.115l4.758 -4.758a3 3 0 0 1 2.12 -5.122l-.005 -.005'
            variants={VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

IconBone.displayName = 'IconBone';

export { IconBone };

// "use client";

// import type { Variants } from "motion/react";
// import { motion, useAnimation } from "motion/react";
// import type { HTMLAttributes } from "react";
// import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

// import { cn } from "@/lib/utils";

// export interface BoneIconHandle {
//   startAnimation: () => void;
//   stopAnimation: () => void;
// }

// interface BoneIconProps extends HTMLAttributes<HTMLDivElement> {
//   size?: number;
// }

// const VARIANTS: Variants = {
//   normal: { rotate: 0 },
//   animate: {
//     rotate: [0, -8, 8, -6, 0],
//     transition: {
//       ease: "circIn",
//       rotate: {
//         duration: 0.5,
//       },
//     },
//   },
// };

// const BoneIcon = forwardRef<BoneIconHandle, BoneIconProps>(
//   ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
//     const controls = useAnimation();
//     const isControlledRef = useRef(false);

//     useImperativeHandle(ref, () => {
//       isControlledRef.current = true;

//       return {
//         startAnimation: () => controls.start("animate"),
//         stopAnimation: () => controls.start("normal"),
//       };
//     });

//     const handleMouseEnter = useCallback(
//       (e: React.MouseEvent<HTMLDivElement>) => {
//         if (isControlledRef.current) {
//           onMouseEnter?.(e);
//         } else {
//           controls.start("animate");
//         }
//       },
//       [controls, onMouseEnter]
//     );

//     const handleMouseLeave = useCallback(
//       (e: React.MouseEvent<HTMLDivElement>) => {
//         if (isControlledRef.current) {
//           onMouseLeave?.(e);
//         } else {
//           controls.start("normal");
//         }
//       },
//       [controls, onMouseLeave]
//     );
//     return (
//       <div
//         className={cn(className)}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         {...props}
//       >
//         <svg
//           fill="none"
//           height={size}
//           stroke="currentColor"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//           width={size}
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <motion.path
//             animate={controls}
//             d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"
//             variants={VARIANTS}
//           />
//         </svg>
//       </div>
//     );
//   }
// );

// BoneIcon.displayName = "BoneIcon";

// export { BoneIcon };
