import { AccessTime, CalendarMonth, Dns, EventNote } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import MarkdownInput from './MarkdownInput';
import React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
  DateInput,
  useRecordContext,
  BooleanInput,
  DateTimeInput,
  NumberInput,
  SelectField,
  SelectInput,
  NumberField,
  SearchInput,
  ChipField,
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
  Filter,
  FunctionField,
} from 'react-admin';
import { formatDate, parseDate } from './util';
import { chains } from 'util/chain';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import {
  endOfYesterday,
  startOfWeek,
  subWeeks,
  startOfMonth,
  subMonths,
} from 'date-fns';

export const AuctionIcon = EventNote;

const auctionFilters = [<SearchInput source='title' alwaysOn key={0} />];

export const AuctionFilterSidebar = () => (
  <Card
    sx={{
      order: -1,
      flex: '0 0 15em',
      mr: 2,
      mt: 9.5,
    }}
  >
    <CardContent>
      <FilterLiveSearch source='title' />
      <FilterList label='resources.auctions.fields.chain' icon={<Dns />}>
        {Object.keys(chains).map((c) => (
          <FilterListItem label={chains[c].name} value={{ chain: c }} key={c} />
        ))}
      </FilterList>
      <FilterList
        label='resources.auctions.filters.last_visited'
        icon={<AccessTime />}
      >
        <FilterListItem
          label='resources.auctions.filters.today'
          value={{
            startDateGte: endOfYesterday().toISOString(),
            startDateLte: undefined,
          }}
        />
        <FilterListItem
          label='resources.auctions.filters.this_week'
          value={{
            startDateGte: startOfWeek(new Date()).toISOString(),
            startDateLte: undefined,
          }}
        />
        <FilterListItem
          label='resources.auctions.filters.last_week'
          value={{
            startDateGte: subWeeks(startOfWeek(new Date()), 1).toISOString(),
            startDateLte: startOfWeek(new Date()).toISOString(),
          }}
        />
        <FilterListItem
          label='resources.auctions.filters.this_month'
          value={{
            startDateGte: startOfMonth(new Date()).toISOString(),
            startDateLte: undefined,
          }}
        />
        <FilterListItem
          label='resources.auctions.filters.last_month'
          value={{
            startDateGte: subMonths(startOfMonth(new Date()), 1).toISOString(),
            startDateLte: startOfMonth(new Date()).toISOString(),
          }}
        />
        <FilterListItem
          label='resources.auctions.filters.earlier'
          value={{
            startDateGte: undefined,
            startDateLte: subMonths(startOfMonth(new Date()), 1).toISOString(),
          }}
        />
      </FilterList>
    </CardContent>
  </Card>
);

const postFilters = [
  <SearchInput source='title' alwaysOn placeholder='Search' key={0} />,
  <SelectInput
    key={1}
    source='chain'
    choices={Object.keys(chains).map((c) => ({
      id: c,
      name: chains[c].name,
    }))}
    alwaysOn
  />,
  <SelectInput
    key={1}
    source='test'
    label='Date'
    choices={[
      {
        id: 'today',
        name: 'resources.auctions.filters.today',
      },
    ]}
    alwaysOn
  />,
];

export const AuctionList = () => (
  <List sort={{ field: 'id', order: 'desc' }} filters={postFilters}>
    <Datagrid rowClick='edit'>
      <TextField source='id' />
      <TextField source='title' />
      <DateField source='startDate' />
      <DateField source='expiresAt' label='Expiry date' />
      <DateField source='maxExpiryDate' />
      <NumberField source='bidFee' />
      <NumberField source='bidStep' />
      <NumberField source='numberOfWinners' />
      <ChipField source='chain' />
      <NumberField source='currentBid' />
      <FunctionField
        label='Status'
        sortBy='author.last_name'
        render={(record: AuctionType) => (
          <Chip
            color={record.isFinalized ? 'success' : 'primary'}
            label={record.isFinalized ? 'Done' : 'Ready'}
          />
        )}
      />
      <EditButton />
    </Datagrid>
  </List>
);

const AuctionTitle = () => {
  const record = useRecordContext();
  return <span>Edit Auction {record ? `"${record.title}"` : ''}</span>;
};

const Poster = () => {
  const record = useRecordContext<Product>();
  if (!record) return null;
  return (
    <Card sx={{ display: 'inline-block' }}>
      <CardMedia
        component='img'
        image={record.imageUrl}
        alt=''
        sx={{ maxWidth: '42em', maxHeight: '15em' }}
      />
    </Card>
  );
};

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateParseRegex = /(\d{4})-(\d{2})-(\d{2})/;

const convertDateToString = (value) => {
  // value is a `Date` object
  if (!(value instanceof Date) || isNaN(value.getDate())) return '';
  const pad = '00';
  const yyyy = value.getFullYear().toString();
  const MM = (value.getMonth() + 1).toString();
  const dd = value.getDate().toString();
  return `${yyyy}-${(pad + MM).slice(-2)}-${(pad + dd).slice(-2)}`;
};

const dateFormatter = (value) => {
  // null, undefined and empty string values should not go through dateFormatter
  // otherwise, it returns undefined and will make the input an uncontrolled one.
  if (value == null || value === '') return '';
  console.log(convertDateToString(value));
  if (value instanceof Date) return convertDateToString(value);
  // Valid dates should not be converted
  if (dateFormatRegex.test(value)) return value;

  return convertDateToString(new Date(value));
};

const dateParser = (value) => {
  //value is a string of "YYYY-MM-DD" format
  const match = dateParseRegex.exec(value);
  if (match === null) return;
  const d = new Date(match[1], parseInt(match[2], 10) - 1, match[3]);
  if (isNaN(d.getDate())) return;
  console.log(d);
  return d;
};

const AuctionForm = () => (
  <SimpleForm>
    <Typography variant='h6' gutterBottom>
      Auction
    </Typography>
    <TextInput source='title' sx={{ minWidth: '300px' }} required />
    <Poster />
    <TextInput source='imageUrl' sx={{ minWidth: '300px' }} />
    <SelectInput
      required
      source='chain'
      choices={Object.keys(chains).map((c) => ({
        id: c,
        name: chains[c].name,
      }))}
    />
    <MarkdownInput source='description' label='Description' required />
    <MarkdownInput source='claimSuccess' label='Claim success' />
    <Typography variant='h6' gutterBottom mt={1}>
      Socials
    </Typography>
    <Box display='flex' gap={2}>
      <TextInput source='website' />
      <TextInput source='discord' />
      <TextInput source='telegram' />
      <TextInput source='twitter' />
    </Box>
    <Typography variant='h6' gutterBottom mt={1}>
      Dates (UTC)
    </Typography>
    <DateTimeInput source='announcementDate' />
    <Box display='flex' gap='1em'>
      <DateInput
        source='startDate'
        required
        format={dateFormatter}
        parse={dateParser}
        options={{ onBlur: () => {} }}
      />
      <DateTimeInput label='Expiration' source='expiresAt' required />
      <DateTimeInput label='Max Expiration' source='maxExpiryDate' required />
    </Box>
    <DateTimeInput label='Max Claim Date' source='maxClaimDate' />
    <Typography variant='h6' gutterBottom mt={1}>
      Params
    </Typography>
    <Box display='flex' gap='1em'>
      <NumberInput source='currentBid' defaultValue={0.01} />
      <NumberInput source='bidFee' defaultValue={1} />
      <NumberInput source='bidStep' defaultValue={0.01} />
    </Box>
    <NumberInput source='numberOfWinners' required />
    <TextInput source='privateCode' />
    <BooleanInput source='isExclusiveToKuCoin' label='KuCoin Only' />
  </SimpleForm>
);

export const AuctionEdit = () => (
  <Edit title={<AuctionTitle />}>
    <AuctionForm />
  </Edit>
);

export const AuctionCreate = () => (
  <Create title='Create an Auction'>
    <AuctionForm />
  </Create>
);
