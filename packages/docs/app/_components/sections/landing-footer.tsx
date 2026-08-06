import { LINKS } from '@/src/constants';
import { Link } from '../link';

export const LandingFooter = () => {
  return (
    <div className='flex justify-center px-4 py-6'>
      <small className='text-sm leading-none font-medium'>
        Created by <Link href={LINKS.GITHUB}>tungulin</Link>
      </small>
    </div>
  );
};
