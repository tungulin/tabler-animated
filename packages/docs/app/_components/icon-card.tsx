'use client';

import { useRef } from 'react';
import { Button, Card, Tooltip, TooltipTrigger, TooltipContent } from '@/src/ui';
import { useCopy } from '@siberiacancode/reactuse';
import { IconCheck, IconCopy, type IconComponent, type IconHandle } from 'tabler-animated';

interface Props {
  name: string;
  icon: IconComponent;
  source: string;
}

export const IconCard = (props: Props) => {
  const iconRef = useRef<IconHandle>(null);
  const copyIconRef = useRef<IconHandle>(null);
  const { copy, copied } = useCopy();

  const handleMouseEnter = () => iconRef.current?.startAnimation();
  const handleMouseLeave = () => iconRef.current?.stopAnimation();

  const handleMouseEnterCopy = () => copyIconRef.current?.startAnimation();
  const handleMouseLeaveCopy = () => copyIconRef.current?.stopAnimation();

  const Icon = props.icon;

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='flex flex-col items-center gap-5 px-5 pt-6 pb-4'
    >
      <Icon size={38} ref={iconRef} />
      <small className='min-h-[28px] text-sm leading-none font-medium'>{props.name}</small>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Button
            onMouseEnter={handleMouseEnterCopy}
            onMouseLeave={handleMouseLeaveCopy}
            variant='secondary'
            onClick={() => copy(props.source)}
          >
            {copied ? <IconCheck /> : <IconCopy ref={copyIconRef} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className='bg-primary' side='bottom'>
          <small className='min-h-[28px] text-xs leading-none font-medium'>
            {copied && 'Copied'}
            {!copied && (
              <div>
                Copy
                <code className='bg-muted text-primary mx-1 rounded-md px-1 py-0.5 font-mono font-semibold'>
                  .tsx
                </code>
                code
              </div>
            )}
          </small>
        </TooltipContent>
      </Tooltip>
    </Card>
  );
};
