import { IconCard } from '../_components/icon-card';
import { LandingHeader } from '../_components/sections';
import { LandingFooter } from '../_components/sections/landing-footer';
import { LandingHero } from '../_components/sections/landing-hero';

export default function Page() {
  return (
    <div>
      <LandingHeader />
      <LandingHero />
      <div className='mt-15 grid grid-cols-6 gap-1.5 px-4'>
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
        <IconCard />
      </div>
      <LandingFooter />
    </div>
  );
}
