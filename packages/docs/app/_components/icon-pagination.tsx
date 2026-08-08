'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/src/ui/pagination';
import { useQueryStates } from 'nuqs';
import { iconSearchParams } from '../(root)/search-params';

type IconPaginationProps = {
  pageCount: number;
};

export const IconPagination = ({ pageCount }: IconPaginationProps) => {
  const [{ page }, setParams] = useQueryStates(iconSearchParams, {
    shallow: false
  });

  if (pageCount <= 1) return null;

  const goToPage = (target: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setParams({ page: Math.min(Math.max(target, 1), pageCount) });
  };

  return (
    <Pagination className='mt-10'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            aria-disabled={page <= 1}
            className={page <= 1 ? 'pointer-events-none opacity-50' : undefined}
            onClick={goToPage(page - 1)}
          />
        </PaginationItem>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href='#' isActive={p === page} onClick={goToPage(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href='#'
            aria-disabled={page >= pageCount}
            className={page >= pageCount ? 'pointer-events-none opacity-50' : undefined}
            onClick={goToPage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
