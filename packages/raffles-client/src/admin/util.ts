import { format, parse } from 'date-fns';

export const formatDate = (date?: Date) => {
  console.log(date);
  return date ? `${format(new Date(date), 'yyyy-MM-dd hh:mma')} UTC` : 'N/A';
};

export const parseDate = (date?: string) => {
  console.log(date);
  // return parse(date, 'yyyy-MM-dd', new Date());
  return new Date();
};
