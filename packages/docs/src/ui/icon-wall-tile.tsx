'use client';

import { useRef } from 'react';
import { cn } from '@/src/lib/utils';
import type { IconComponent, IconHandle } from 'tabler-animated';

interface IconWallTileProps {
  icon: IconComponent;
  size: number;
  iconSize: number;
}

export const IconWallTile = ({
  icon: Icon,
  size,
  iconSize,
  className,
  ...props
}: React.ComponentProps<'div'> & IconWallTileProps) => {
  const iconRef = useRef<IconHandle>(null);

  const handleMouseEnter = () => iconRef.current?.startAnimation();
  const handleMouseLeave = () => iconRef.current?.stopAnimation();

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'text-muted-foreground/50 border-border/50 hover:text-foreground hover:border-border hover:bg-card pointer-events-auto flex items-center justify-center rounded-xl border transition-colors duration-300',
        className
      )}
      style={{ height: size }}
      {...props}
    >
      <Icon size={iconSize} ref={iconRef} />
    </div>
  );
};
