import { use } from 'react';

import { ThemeContext } from './theme-context';

export const useTheme = () => use(ThemeContext);
