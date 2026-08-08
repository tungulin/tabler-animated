import type { ComponentType, HTMLAttributes, RefAttributes } from 'react';

export interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export type IconComponent = ComponentType<IconProps & RefAttributes<IconHandle>>;
