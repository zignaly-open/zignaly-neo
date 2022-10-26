import { EventNote } from '@mui/icons-material';
import { Box, Card, CardMedia, Chip, Typography } from '@mui/material';
import MarkdownInput from './MarkdownInput';
import React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  useRecordContext,
  BooleanInput,
  NumberInput,
  SelectInput,
  NumberField,
  SearchInput,
  ChipField,
  FunctionField,
  useTranslate,
} from 'react-admin';
import { chains } from 'util/chain';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import DateTimeInput from './DateTimeInput';
import DateField from './DateField';

export const AuctionIcon = EventNote;

const auctionFilters = [
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
];

export const AuctionList = () => (
  <List sort={{ field: 'id', order: 'desc' }} filters={auctionFilters}>
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
        sortBy='isFinalized'
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

const Poster = () => {
  const record = useRecordContext<AuctionType>();
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

const AuctionForm = () => {
  const translate = useTranslate();
  return (
    <SimpleForm>
      <Typography variant='h6' gutterBottom>
        {translate('resources.auctions.name')}
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
        {translate('resources.auctions.socials')}
      </Typography>
      <Box display='flex' gap={2}>
        <TextInput source='website' />
        <TextInput source='discord' />
        <TextInput source='telegram' />
        <TextInput source='twitter' />
      </Box>
      <Typography variant='h6' gutterBottom mt={1}>
        {translate('resources.auctions.dates')}
      </Typography>
      <DateTimeInput source='announcementDate' label='Announcement date' />
      <Box display='flex' gap='1em'>
        <DateTimeInput source='startDate' label='Start date*' required />
        <DateTimeInput label='Expiration date*' source='expiresAt' required />
        <DateTimeInput
          label='Max expiration*'
          source='maxExpiryDate'
          required
        />
      </Box>
      <DateTimeInput label='Max claim date' source='maxClaimDate' />
      <Typography variant='h6' gutterBottom mt={1}>
        {translate('resources.auctions.params')}
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
};

export const AuctionEdit = () => (
  <Edit>
    <AuctionForm />
  </Edit>
);

export const AuctionCreate = () => (
  <Create title='Create an Auction' redirect='list'>
    <AuctionForm />
  </Create>
);
