import { ThemeButton } from '../theme-button';
import { Button, Card } from '@/src/ui';
import { LINKS } from '@/src/constants';
import { IconBrandGithub, IconEaseInOutControlPoints } from 'tabler-animated';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';

export const LandingHeader = () => {
  return (
    <header className='flex justify-between px-4 pt-3 pb-1'>
      <div className='flex items-center gap-3'>
        <Card className='relative overflow-hidden rounded-lg p-1.5'>
          <IconEaseInOutControlPoints size={18} />
        </Card>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>tabler-animated</h4>
      </div>
      <div className='bg-background/70 supports-[backdrop-filter]:bg-background/60 border-border/70 flex items-center gap-0.5 rounded-xl border backdrop-blur'>
        <Button asChild size='sm' className='rounded-xl' variant='ghost'>
          <Link href={LINKS.REPOSITORY} target='_blank' rel='noopener noreferrer'>
            <IconBrandGithub />
          </Link>
        </Button>
        <ThemeButton />
      </div>
    </header>
  );
};
