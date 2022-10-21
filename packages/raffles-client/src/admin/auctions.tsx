import { EventNote } from '@mui/icons-material';
import { Box, Card, CardMedia, Typography } from '@mui/material';
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
} from 'react-admin';
import { formatDate, parseDate } from './util';
import { chains } from 'util/chain';
export const AuctionIcon = EventNote;

export const AuctionList = () => (
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='title' />
      <TextField source='chain' />
      <DateField source='createdAt' />
      <DateField source='startDate' />
      <TextField source='numberOfWinners' />
      <TextField source='currentBid' />
      <EditButton />
    </Datagrid>
  </List>
);

export const PostList = () => (
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='title' />
      <TextField source='description' />
      <TextField source='average_note' />
      <TextField source='views' />
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
