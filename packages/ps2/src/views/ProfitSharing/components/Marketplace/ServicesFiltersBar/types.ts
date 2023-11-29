import { ZigFilters } from '@zignaly-open/ui';
import { ComponentProps } from 'react';

type ZigFiltersProps = ComponentProps<typeof ZigFilters>;
export type ServicesFiltersBarProps = {
  count: number;
  initialFilters: ZigFiltersProps['initialFilters'];
  defaultFilters: ZigFiltersProps['defaultFilters'];
  onChange: ZigFiltersProps['onChange'];
  search: ZigFiltersProps['search'];
  onSearchChange: ZigFiltersProps['onSearchChange'];
};
