import { EventNote } from '@mui/icons-material';
import { Box, Card, CardMedia } from '@mui/material';
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
} from 'react-admin';
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

export const AuctionEdit = () => (
  <Edit title={<AuctionTitle />}>
    <SimpleForm>
      <TextInput source='title' sx={{ minWidth: '300px' }} />
      {/* <TextInput disabled source='id' /> */}
      {/* <DateTimeInput disabled label='Creation Date' source='createdAt' /> */}
      <Poster />
      <TextInput source='imageUrl' sx={{ minWidth: '300px' }} />
      <Box display='flex' gap={2}>
        <DateTimeInput source='announcementDate' />
        <DateTimeInput source='startDate' />
      </Box>
      <Box display='flex' gap='1em'>
        <DateTimeInput label='Expiration' source='expiresAt' />
        <DateTimeInput label='Max Expiration' source='maxExpiryDate' />
      </Box>
      <DateTimeInput label='Max Claim Date' source='maxClaimDate' />
      <MarkdownInput source='description' label='Description' />
      <MarkdownInput source='claimSuccess' label='Claim success' />
      <Box display='flex' gap={2}>
        <TextInput source='website' />
        <TextInput source='discord' />
        <TextInput source='telegram' />
        <TextInput source='twitter' />
      </Box>
      <TextInput source='chain' />
      <Box display='flex' gap='1em'>
        <NumberInput source='currentBid' />
        <NumberInput source='bidFee' />
        <NumberInput source='bidStep' />
      </Box>
      <NumberInput source='numberOfWinners' />
      <TextInput source='privateCode' />
      <BooleanInput source='isExclusiveToKuCoin' label='KuCoin Only' />
      {/* <TextInput source='title' />
      <TextInput source='teaser' options={{ multiline: true }} />
      <TextInput multiline source='body' />
      <DateInput label='Publication date' source='published_at' />
      <TextInput source='average_note' />
      <TextInput disabled label='Nb views' source='views' /> */}
    </SimpleForm>
  </Edit>
);

export const AuctionCreate = () => (
  <Create title='Create an Auction'>
    <SimpleForm>
      <MarkdownInput source='description' label='Description' />
      <MarkdownInput source='claimSuccess' label='Claim success' />
    </SimpleForm>
  </Create>
);
