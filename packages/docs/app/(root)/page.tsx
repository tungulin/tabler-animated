import { LandingHeader } from '../_components/sections';
import { TextAnimate } from '@/src/ui/text-animated';

export default function Page() {
  return (
    <div>
      <LandingHeader />
      <div>
        <div className='mt-30 flex w-full flex-col items-center justify-center gap-9'>
          <TextAnimate
            as='h1'
            className='max-w-4xl text-3xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-4xl xl:tracking-tighter'
          >
            Beautifully crafted animated icons
          </TextAnimate>
          <p className='text-foreground max-w-3xl text-center text-base sm:text-lg'>
            an open-source (MIT License) collection of smooth animated icons for your projects. feel
            free to use them, share your feedback, and let's make this library awesome together
          </p>
          <p className='flex items-center gap-1 text-lg font-semibold'>
            Crafted with
            <a
              href='https://motion.dev/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              Motion
            </a>
            &
            <a
              href='https://tabler.io/icons/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              Tabler
            </a>
          </p>
        </div>
      </div>
      <div className='mt-10 grid grid-cols-4 gap-4'>
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
        <div>05</div>
        <div>06</div>
        <div>07</div>
        <div>08</div>
      </div>
    </div>
  );
}
