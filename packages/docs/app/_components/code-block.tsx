'use client';

import { Button } from '@/src/ui';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/src/ui';
import { useCookie, useCopy, useLocalStorage } from '@siberiacancode/reactuse';
import { IconCheck, IconCopy } from 'tabler-animated';
import { COOKIES } from '@/src/constants';
import clsx from 'clsx';

type PackageManager = 'bun' | 'npm' | 'pnpm' | 'yarn';

const DEFAULT_PACKAGE_MANAGER: PackageManager = 'pnpm';

const TABS: PackageManager[] = ['pnpm', 'npm', 'yarn', 'bun'];

const COMMANDS: Record<PackageManager, string> = {
  pnpm: 'pnpm add',
  npm: 'npm install',
  yarn: 'yarn add',
  bun: 'bun add'
};

interface CodeBlockCommandProps {
  className?: string;
}

export const CodeBlockCommand = (props: CodeBlockCommandProps) => {
  const { copy, copied } = useCopy();

  const packageManagerCookie = useCookie(COOKIES.PACKAGE, {
    initialValue: DEFAULT_PACKAGE_MANAGER,
    path: '/'
  });

  const packageManager = packageManagerCookie.value;

  const npmTextForCopy = COMMANDS[packageManager] + ' ' + 'tabler-animated';

  return (
    <div className={clsx('flex w-full items-center justify-center px-3', props.className)}>
      <div className='bg-code border-code-border w-full rounded-lg border-1 sm:w-xl'>
        <div className='overflow-x-auto'>
          <Tabs
            value={packageManager}
            className='gap-0'
            onValueChange={(value) => packageManagerCookie.set(value as PackageManager)}
          >
            <div className='border-border/50 flex items-center gap-2 border-b px-3 py-1'>
              <TabsList className='flex w-full justify-between rounded-none bg-transparent p-0'>
                <div>
                  {TABS.map((_package) => (
                    <TabsTrigger
                      key={_package}
                      value={_package}
                      className='data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none'
                    >
                      {_package}
                    </TabsTrigger>
                  ))}
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      data-slot='copy-button'
                      size='icon'
                      variant='ghost'
                      className='ml-5 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100'
                      onClick={() => copy(npmTextForCopy)}
                    >
                      <span className='sr-only'>Copy</span>
                      {copied ? <IconCheck /> : <IconCopy />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{copied ? 'Copied' : 'Copy to Clipboard'}</TooltipContent>
                </Tooltip>
              </TabsList>
            </div>
            <div className='no-scrollbar overflow-x-auto'>
              {TABS.map((_package) => (
                <TabsContent key={_package} value={_package} className='mt-0 px-4 py-3.5'>
                  <pre>
                    <code
                      className='text-code-foreground relative font-mono text-sm leading-none'
                      data-language='bash'
                    >
                      {COMMANDS[_package] + ' ' + 'tabler-animated'}
                    </code>
                  </pre>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
