import { cn } from '@/src/lib/utils';
import { IconWallTile } from './icon-wall-tile';
import type { IconComponent } from 'tabler-animated';

interface IconWallBackgroundProps {
  icons: { name: string; component: IconComponent }[];
  height?: number;
  tileSize?: number;
  iconSize?: number;
  gap?: number;
  x?: number;
  y?: number;
  horizontalVignetteSize?: number;
  verticalVignetteSize?: number;
}

export function IconWallBackground({
  icons,
  className,
  style,
  height = 440,
  tileSize = 72,
  iconSize = 26,
  gap = 8,
  x = 50,
  y = 38,
  horizontalVignetteSize = 70,
  verticalVignetteSize = 65,
  ...props
}: React.ComponentProps<'div'> & IconWallBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden', className)}
      style={{
        height,
        maskImage: `radial-gradient(ellipse ${horizontalVignetteSize}% ${verticalVignetteSize}% at ${x}% ${y}%, black 0%, transparent 100%)`,
        ...style
      }}
      {...props}
    >
      <div
        className='grid'
        style={{
          gap,
          marginTop: -tileSize / 2.5,
          gridTemplateColumns: `repeat(auto-fill, minmax(${tileSize}px, 1fr))`
        }}
      >
        {icons.map(({ name, component }) => (
          <IconWallTile key={name} icon={component} size={tileSize} iconSize={iconSize} />
        ))}
      </div>
    </div>
  );
}
