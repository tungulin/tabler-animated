import { cn } from '@/src/lib/utils';

interface GridVignetteBackgroundProps {
  size?: number;
  x?: number;
  y?: number;
  horizontalVignetteSize?: number;
  verticalVignetteSize?: number;
  intensity?: number;
}

export function GridVignetteBackground({
  className,
  size = 48,
  x = 50,
  y = 50,
  horizontalVignetteSize = 100,
  verticalVignetteSize = 100,
  intensity = 0
}: React.ComponentProps<'div'> & GridVignetteBackgroundProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-[-1] bg-[image:linear-gradient(to_right,var(--muted-foreground),transparent_1px),linear-gradient(to_bottom,var(--muted-foreground),transparent_1px)] opacity-50',
        className
      )}
      style={{
        backgroundSize: `${size}px ${size}px`,
        maskImage: `radial-gradient(ellipse ${horizontalVignetteSize}% ${verticalVignetteSize}% at ${x}% ${y}%, black ${
          100 - intensity
        }%, transparent 100%)`
      }}
    />
  );
}
