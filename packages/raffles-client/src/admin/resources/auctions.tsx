import { EventNote } from '@mui/icons-material';
import { Box, Card, CardMedia, Chip, Typography } from '@mui/material';
import MarkdownInput from '../components/MarkdownInput';
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
  email,
  ArrayField,
  BooleanField,
  TabbedShowLayout,
  Tab,
  ListToolbar,
  ExportButton,
  downloadCSV,
} from 'react-admin';
import { chains } from 'util/chain';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import DateTimeInput from '../components/DateTimeInput';
import DateField from '../components/DateField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import EditToolbar from 'admin/components/EditToolbar';
import jsonExport from 'jsonexport/dist';

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
      <DateField source='startDate' multiline={true} />
      <DateField source='expiresAt' label='Expiry date' multiline={true} />
      <DateField source='maxExpiryDate' multiline={true} label='Max expiry' />
      <NumberField source='bidFee' />
      <NumberField source='bidStep' />
      <NumberField source='numberOfWinners' label='No. of winners' />
      <ChipField source='chain' />
      <NumberField source='currentBid' />
      <FunctionField
        label='Status'
        sortBy='isFinalized'
        render={(record: AuctionType) => (
          <Chip
            color={
              record.isFinalized
                ? 'success'
                : new Date(record.startDate) < new Date()
                ? 'warning'
                : 'primary'
            }
            label={
              record.isFinalized
                ? 'Done'
                : new Date(record.startDate) < new Date()
                ? 'Running'
                : 'Ready'
            }
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

const schema = yup
  .object()
  .shape({
    announcementDate: yup.date().nullable(),
    startDate: yup.date(),
    expiresAt: yup
      .date()
      .when('startDate', (startDate, s) =>
        s.min(
          new Date(startDate.getTime() + 1000),
          'errors.date.expAfterStart',
        ),
      ),
    maxExpiryDate: yup
      .date()
      .when('expiresAt', (expiresAt, s) =>
        s.min(
          new Date(expiresAt.getTime() + 1000),
          'errors.date.maxExpAfterExp',
        ),
      ),
    maxClaimDate: yup
      .date()
      .nullable()
      .when('startDate', (startDate, s) =>
        s.min(
          new Date(startDate.getTime() + 1000),
          'errors.date.claimDateAfterMaxExp',
        ),
      ),
  })
  .required();

const AuctionForm = () => {
  const translate = useTranslate();
  return (
    <SimpleForm resolver={yupResolver(schema)} toolbar={<EditToolbar />}>
      <Typography variant='h6' gutterBottom>
        {translate('resources.auctions.name')}
      </Typography>
      <TextInput source='title' sx={{ minWidth: '300px' }} required />
      <Poster />
      <TextInput
        source='imageUrl'
        sx={{ minWidth: '300px' }}
        validate={email()}
      />
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
        <DateTimeInput source='startDate' label='Start date' required />
        <DateTimeInput label='Expiration date' source='expiresAt' required />
        <DateTimeInput label='Max expiration' source='maxExpiryDate' required />
      </Box>
      <DateTimeInput label='Max claim date' source='maxClaimDate' />
      <Typography variant='h6' gutterBottom mt={1}>
        {translate('resources.auctions.params')}
      </Typography>
      <Box display='flex' gap='1em'>
        <NumberInput source='currentBid' defaultValue={0.01} min={0} />
        <NumberInput source='bidFee' defaultValue={1} min={0} />
        <NumberInput source='bidStep' defaultValue={0.01} min={0} />
      </Box>
      <NumberInput source='numberOfWinners' required min={1} />
      <TextInput source='privateCode' />
      <BooleanInput source='isExclusiveToKuCoin' label='KuCoin Only' />
    </SimpleForm>
  );
};

const Participants = () => {
  const translate = useTranslate();
  const record = useRecordContext<AuctionType>();

  const exporter = () => {
    const postsForExport = record.bids
      .map((bid) => ({
        position: bid.position,
        userId: bid.user.id,
        username: bid.user.username,
        discordName: bid.user.discordName,
        isWinner: bid.isWinner,
        isClaimed: bid.isClaimed,
      }))
      .sort((a, b) => a.position - b.position);
    jsonExport(postsForExport, (_, csv: string) => {
      downloadCSV(csv, 'participants');
    });
  };

  if (!record.bids.length) {
    return (
      <Typography mt={2}>
        {translate('resources.auctions.noParticipants')}
      </Typography>
    );
  }

  return (
    <>
      <ListToolbar
        actions={<ExportButton maxResults={0} exporter={exporter} />}
      />
      <ArrayField source='bids'>
        <Datagrid bulkActionButtons={false}>
          <TextField source='position' />
          <TextField source='user.id' />
          <TextField source='user.username' label='Username' />
          <TextField source='user.discordName' label='Discord' />
          <BooleanField source='isWinner' />
          <BooleanField source='isClaimed' />
        </Datagrid>
      </ArrayField>
    </>
  );
};

export const AuctionEdit = () => (
  <Edit>
    <TabbedShowLayout>
      <Tab label='Edit'>
        <AuctionForm />
      </Tab>
      <Tab label='Participants'>
        <Participants />
      </Tab>
    </TabbedShowLayout>
  </Edit>
);

export const AuctionCreate = () => (
  <Create title='Create an Auction' redirect='list'>
    <AuctionForm />
  </Create>
);
