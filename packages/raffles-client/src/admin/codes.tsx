import { EventNote, Redeem } from '@mui/icons-material';
import { Box, Card, CardMedia, Stack, Typography } from '@mui/material';
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
  FilterForm,
  FilterButton,
  CreateButton,
  ListBase,
} from 'react-admin';
import { formatDate, parseDate } from './util';
import { chains } from 'util/chain';

export const CodeIcon = Redeem;

const codeFilters = [<SearchInput source='code' alwaysOn />];
const postFilters = [
  <TextInput label='Search' source='q' alwaysOn />,
  <TextInput label='Title' source='title' defaultValue='Hello, World!' />,
];

const ListToolbar = () => (
  <Stack direction='row' justifyContent='space-between'>
    <FilterForm filters={postFilters} />
    <div>
      <FilterButton filters={postFilters} />
      <CreateButton />
    </div>
  </Stack>
);

export const CodeList = () => (
  <ListBase
    sort={{ field: 'createdAt', order: 'desc' }}
    sx={{
      '& .RaList-main': {
        maxWidth: { sm: 'calc(100vw - 90px)' },
        overflowX: 'scroll',
      },
    }}
  >
    <ListToolbar />
    <Datagrid rowClick='edit'>
      <TextField source='code' />
      <TextField source='user.id' label='UserId' />
      <TextField source='user.username' label='Username' />
      <BooleanField source='welcomeType' />
      <NumberField source='reqMinimumBalance' />
      <NumberField source='reqMinimumDeposit' />
      <DateField source='reqDepositFrom' showTime={true} />
      <NumberField source='reqMinAuctions' />
      <TextField source='reqWalletType' />
      <NumberField source='currentRedemptions' />
      <NumberField source='maxRedemptions' />
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
  </ListBase>
);

const CodeTitle = () => {
  const record = useRecordContext();
  return <span>Edit Code {record ? `"${record.code}"` : ''}</span>;
};

const CodeForm = () => (
  <SimpleForm>
    <Typography variant='h6' gutterBottom>
      Code
    </Typography>
    <TextInput source='code' />
    <BooleanInput source='welcomeType' />
    <Typography variant='h6' gutterBottom mt={1}>
      Requirements
    </Typography>
    <NumberInput source='reqMinimumBalance' />
    <NumberInput source='reqMinimumDeposit' />
    <NumberInput source='reqMinimumBalance' />
    <DateTimeInput source='reqDepositFrom' />
    <NumberInput source='reqMinAuctions' />
    <SelectInput
      source='reqWalletType'
      choices={[
        { id: 'metamask', name: 'MetaMask' },
        { id: 'kucoin', name: 'KuCoin' },
      ]}
    />
    <Typography variant='h6' gutterBottom mt={1}>
      Benefit
    </Typography>
    <NumberInput source='benefitDirect' />
    <NumberInput source='benefitBalanceFactor' />
    <NumberInput source='benefitDepositFactor' />
    <NumberInput source='maxTotalBenefits' />
    <Typography variant='h6' gutterBottom mt={1}>
      Reward
    </Typography>
    <NumberInput source='rewardDirect' />
    <NumberInput source='rewardFactor' />
    <NumberInput source='rewardDepositFactor' />
    <NumberInput source='maxTotalRewards' />
    <Typography variant='h6' gutterBottom mt={1}>
      Redemptions
    </Typography>
    <NumberInput source='currentRedemptions' />
    <NumberInput source='maxRedemptions' />
    <Typography variant='h6' gutterBottom mt={1}>
      Dates
    </Typography>
    <DateTimeInput source='startDate' />
    <DateTimeInput source='endDate' />
  </SimpleForm>
);

export const CodeEdit = () => (
  <Edit title={<CodeTitle />}>
    <CodeForm />
  </Edit>
);

export const CodeCreate = () => (
  <Create title='Create a Code'>
    <CodeForm />
  </Create>
);
