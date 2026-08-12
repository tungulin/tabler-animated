'use client';
import { useEffect, useRef } from 'react';
import { IconBan } from 'tabler-animated';
import { Link } from '../link';
import { LINKS } from '@/src/constants';

export const LandingEmpty = () => {
  const banIconRef = useRef(null);

  useEffect(() => {
    banIconRef.current.startAnimation();
  }, []);

  return (
    <div className='flex h-[300px] w-full flex-col items-center justify-center'>
      <div className='mb-5 flex items-center gap-2'>
        <IconBan ref={banIconRef} />
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Icon not found.</h3>
      </div>
      <p className='text-muted-foreground text-sm'>
        We might not have gotten around to adding it yet.
      </p>
      <p className='text-muted-foreground text-sm'>
        You can &nbsp;
        <Link href={`${LINKS.REPOSITORY}/blob/main/CONTRIBUTING.md`}>contribute</Link>
        &nbsp; it to our library. We’d be happy to add you!
      </p>
    </div>
  );
};
