import { EventNote, Redeem } from '@mui/icons-material';
import { Box, Card, CardMedia, Typography } from '@mui/material';
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

const codeFilters = [<SearchInput source='q' alwaysOn />];

const CodeListBase = ({ systemCode }: { systemCode: boolean }) => {
  return (
    <List
      hasCreate={systemCode}
      resource='Code'
      sort={{ field: 'createdAt', order: 'desc' }}
      filters={codeFilters}
      filter={{ isDefault: !systemCode }}
      title={systemCode ? 'System Codes' : 'User Codes'}
      sx={{
        '& .RaList-main': {
          maxWidth: { sm: 'calc(100vw - 90px)' },
        },
        '& .RaDatagrid-tableWrapper': {
          overflowX: 'scroll',
        },
      }}
    >
      <Datagrid rowClick='edit'>
        <TextField source='code' />
        {!systemCode && <TextField source='user.id' label='UserId' />}
        {!systemCode && <TextField source='user.username' label='Username' />}
        {systemCode && <BooleanField source='welcomeType' />}
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
        {systemCode && <DateField source='startDate' showTime={true} />}
        {systemCode && <DateField source='endDate' showTime={true} />}
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const CodeList = () => <CodeListBase systemCode={true} />;
export const UserCodeList = () => <CodeListBase systemCode={false} />;

const CodeTitle = () => {
  const record = useRecordContext();
  return <span>Edit Code {record ? `"${record.code}"` : ''}</span>;
};

const CodeForm = () => (
  <SimpleForm>
    <Typography variant='h6' gutterBottom>
      Code
    </Typography>
    <TextInput source='code' required />
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
    <NumberInput source='currentRedemptions' defaultValue={0} />
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

export const CodeSettings = () => (
  <Edit title='Edit Default Code Settings'>
    <CodeForm />
  </Edit>
);
