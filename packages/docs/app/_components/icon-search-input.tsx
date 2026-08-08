'use client';

import { useQueryStates } from 'nuqs';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/src/ui/input-group';
import { Field } from '@/src/ui/field';
import { SearchIcon } from '../../../core/src';
import { iconSearchParams } from '../(root)/search-params';
import { useHotkeys } from '@siberiacancode/reactuse';
import { useRef } from 'react';

type IconSearchInputProps = {
  totalCount: number;
};

export const IconSearchInput = ({ totalCount }: IconSearchInputProps) => {
  const inputRef = useRef(null);
  const [{ search }, setParams] = useQueryStates(iconSearchParams, {
    shallow: false,
    throttleMs: 300
  });

  useHotkeys('cmd+f', (event) => {
    inputRef.current.focus();
  });

  return (
    <Field className='mb-5'>
      <InputGroup className='h-[44px]'>
        <InputGroupInput
          ref={inputRef}
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
