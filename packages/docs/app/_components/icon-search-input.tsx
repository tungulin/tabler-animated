'use client';

import { useQueryStates } from 'nuqs';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/src/ui/input-group';
import { Field } from '@/src/ui/field';
import { SearchIcon } from '../../../core/src';
import { iconSearchParams } from '../(root)/search-params';

type IconSearchInputProps = {
  totalCount: number;
};

export const IconSearchInput = ({ totalCount }: IconSearchInputProps) => {
  const [{ search }, setParams] = useQueryStates(iconSearchParams, {
    shallow: false,
    throttleMs: 300
  });

  return (
    <Field className='mb-5'>
      <InputGroup className='h-[44px]'>
        <InputGroupInput
          placeholder={`Search ${totalCount} outline icons`}
          value={search}
          onChange={(e) => setParams({ search: e.target.value, page: 1 })}
        />
        <InputGroupAddon align='inline-start'>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};
