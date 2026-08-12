import { IconCard } from '../_components/icon-card';
import { IconSearchInput } from '../_components/icon-search-input';
import { LandingHeader } from '../_components/sections';
import { LandingFooter } from '../_components/sections/landing-footer';
import { LandingHero } from '../_components/sections/landing-hero';
import { SearchParams } from 'nuqs/server';
import { ICON_LIST } from '@/generated/icons';
import { loadIconSearchParams } from './search-params';
import { IconPagination } from '../_components/icon-pagination';
import { GridVignetteBackground } from '@/src/ui';
import { cookies } from 'next/headers';
import { COOKIES } from '@/src/constants';
import type { PackageManager } from '../_components/code-block';
import { LandingEmpty } from '../_components/sections/landing-empty';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const LIMIT = 60;

const PACKAGE_MANAGERS: PackageManager[] = ['pnpm', 'npm', 'yarn', 'bun'];

const isPackageManager = (value: string | undefined): value is PackageManager =>
  PACKAGE_MANAGERS.includes(value as PackageManager);

export default async function Page({ searchParams }: PageProps) {
  const query = await loadIconSearchParams(searchParams);

  const cookieStore = await cookies();

  const packageManagerCookie = cookieStore.get(COOKIES.PACKAGE)?.value;
  const initialPackageManager = isPackageManager(packageManagerCookie)
    ? packageManagerCookie
    : undefined;

  const page = query.page;
  const search = query.search.trim().toLowerCase();

  const matched = search ? ICON_LIST.filter((icon) => icon.name.includes(search)) : ICON_LIST;

  const offset = (page - 1) * LIMIT;
  const items = matched.slice(offset, offset + LIMIT);
  const pageCount = Math.ceil(matched.length / LIMIT);

  return (
    <div>
      <LandingHeader />
      <div className='relative pt-10'>
        <LandingHero initialPackageManager={initialPackageManager} />
        <GridVignetteBackground
          x={50}
          y={70}
          intensity={100}
          horizontalVignetteSize={30}
          verticalVignetteSize={70}
        />
      </div>
      <div className='mt-5 px-3 md:mt-10 lg:px-20'>
        <IconSearchInput totalCount={ICON_LIST.length} />
        {!items.length && <LandingEmpty />}
        <div className='grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-1.5'>
          {items.map((icon) => (
            <IconCard key={icon.name} icon={icon.component} name={icon.name} />
          ))}
        </div>
      </div>
      <IconPagination pageCount={pageCount} />
      <LandingFooter />
    </div>
  );
}
