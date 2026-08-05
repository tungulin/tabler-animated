import type { HTMLAttributes } from 'react';

export interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
