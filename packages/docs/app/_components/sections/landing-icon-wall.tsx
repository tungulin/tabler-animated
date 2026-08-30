import { ICON_LIST } from '@/generated/icons';
import { IconWallBackground } from '@/src/ui';

const WALL_ICON_COUNT = 120;

const STEP = Math.max(1, Math.floor(ICON_LIST.length / WALL_ICON_COUNT));

const WALL_ICONS = Array.from(
  { length: Math.min(WALL_ICON_COUNT, ICON_LIST.length) },
  (_, index) => ICON_LIST[(index * STEP) % ICON_LIST.length]
);

export const LandingIconWall = () => <IconWallBackground icons={WALL_ICONS} />;
