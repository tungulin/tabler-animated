import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const iconSearchParams = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1)
};

export const loadIconSearchParams = createLoader(iconSearchParams);
