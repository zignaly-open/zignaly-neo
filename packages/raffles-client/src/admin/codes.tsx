import { EventNote, Redeem } from '@mui/icons-material';
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
  BooleanField,
  NumberField,
  Datetime,
  SearchInput,
} from 'react-admin';
import { formatDate, parseDate } from './util';
import { chains } from 'util/chain';

export const CodeIcon = Redeem;

const codeFilters = [<SearchInput source='code' alwaysOn />];

export const CodeList = () => (
  <List sort={{ field: 'createdAt', order: 'desc' }} filters={codeFilters}>
    <Datagrid
      rowClick='edit'
      sx={{
        '& .RaDatagrid-tableWrapper': {
          maxWidth: 'calc(100vw - 150px)',
          overflowX: 'scroll',
        },
      }}
    >
      <TextField source='code' />
      <TextField source='user.id' label='UserId' />
      <TextField source='user.username' label='Username' />
      <BooleanField source='welcomeType' />
      <TextField source='reqMinimumBalance' />
      <TextField source='reqMinimumDeposit' />
      <DateField source='reqDepositFrom' showTime={true} />
      <TextField source='reqMinAuctions' />
      <TextField source='reqWalletType' />
      <NumberField source='maxRedemptions' />
      <NumberField source='currentRedemptions' />
      <NumberField source='benefitDirect' />
      <NumberField source='benefitBalanceFactor' />
      <NumberField source='benefitDepositFactor' />
      <NumberField source='maxTotalBenefits' />
      <NumberField source='rewardDirect' />
      <NumberField source='rewardFactor' />
      <NumberField source='rewardDepositFactor' />
      <NumberField source='maxTotalRewards' />
      <DateField source='startDate' showTime={true} />
      <DateField source='endDate' showTime={true} />
      <EditButton />
    </Datagrid>
  </List>
);

const AuctionTitle = () => {
  const record = useRecordContext();
  return <span>Edit Auction {record ? `"${record.title}"` : ''}</span>;
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

export const CodeEdit = () => (
  <Edit title={<AuctionTitle />}>
    <AuctionForm />
  </Edit>
);

export const CodeCreate = () => (
  <Create title='Create an Auction'>
    <AuctionForm />
  </Create>
);
