import { IconCard } from '../_components/icon-card';
import { IconSearchInput } from '../_components/icon-search-input';
import { LandingHeader } from '../_components/sections';
import { LandingFooter } from '../_components/sections/landing-footer';
import { LandingHero } from '../_components/sections/landing-hero';
import { SearchParams } from 'nuqs/server';
import { ICON_LIST } from '@/generated/icons';
import { loadIconSearchParams } from './search-params';
import { IconPagination } from '../_components/icon-pagination';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const LIMIT = 15;

export default async function Page({ searchParams }: PageProps) {
  const query = await loadIconSearchParams(searchParams);

  const page = query.page;
  const search = query.search.trim().toLowerCase();

  const matched = search ? ICON_LIST.filter((icon) => icon.name.includes(search)) : ICON_LIST;

  const offset = (page - 1) * LIMIT;
  const items = matched.slice(offset, offset + LIMIT);
  const pageCount = Math.ceil(matched.length / LIMIT);

  return (
    <div>
      <LandingHeader />
      <LandingHero />
      <div className='mt-10 px-20'>
        <IconSearchInput totalCount={ICON_LIST.length} />
        <div className='grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-1.5'>
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
