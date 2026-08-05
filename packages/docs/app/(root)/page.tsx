import { BellIcon } from 'tabler-animated-icons';
import { LandingHeader } from '../_components/sections';

export default function Page() {
  return (
    <div>
      <LandingHeader />

      <div>
        <div className='mt-30 flex w-full flex-col items-center justify-center gap-9'>
          <h1 className='max-w-4xl text-3xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-4xl xl:tracking-tighter'>
            Beautifully crafted animated icons
          </h1>
          <div className='text-lg font-semibold'>Crafted with Motion & Lucide</div>
        </div>
      </div>
    </div>
  );
}
