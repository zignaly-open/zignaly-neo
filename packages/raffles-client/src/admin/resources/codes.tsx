import { Redeem } from '@mui/icons-material';
import { Typography } from '@mui/material';
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
  BooleanInput,
  NumberInput,
  SelectInput,
  BooleanField,
  NumberField,
  SearchInput,
  useTranslate,
} from 'react-admin';
import DateField from '../components/DateField';
import DateTimeInput from '../components/DateTimeInput';

export const CodeIcon = Redeem;

const codeFilters = [
  <SearchInput source='q' alwaysOn placeholder='Code' key={0} />,
];

const CodeListBase = ({ systemCode }: { systemCode: boolean }) => {
  return (
    <List
      hasCreate={systemCode}
      resource='codes'
      sort={{ field: 'createdAt', order: 'desc' }}
      filters={codeFilters}
      filter={{ type: systemCode ? '' : 'user' }}
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
        <NumberField source='reqMinimumBalance' label='Min balance' />
        <NumberField source='reqMinimumDeposit' label='Min deposit' />
        <DateField source='reqDepositFrom' label='Deposit from' />
        <NumberField source='reqMinAuctions' label='Min auctions' />
        <TextField source='reqWalletType' label='Wallet type' />
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
        {systemCode && <DateField source='startDate' />}
        {systemCode && <DateField source='endDate' />}
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const CodeList = () => <CodeListBase systemCode={true} />;
export const UserCodeList = () => <CodeListBase systemCode={false} />;

const CodeForm = () => {
  const translate = useTranslate();

  return (
    <SimpleForm>
      <Typography variant='h6' gutterBottom>
        {translate('resources.codes.name')}
      </Typography>
      <TextInput source='code' required />
      <BooleanInput source='welcomeType' />
      <Typography variant='h6' gutterBottom mt={1}>
        {translate('resources.codes.requirements')}
      </Typography>
      <NumberInput source='reqMinimumBalance' label='Min balance' />
      <NumberInput source='reqMinimumDeposit' label='Min deposit' />
      <DateTimeInput source='reqDepositFrom' label='Deposit from' />
      <NumberInput source='reqMinAuctions' label='Min auctions' />
      <SelectInput
        source='reqWalletType'
        label='Wallet type'
        choices={[
          { id: 'metamask', name: 'MetaMask' },
          { id: 'kucoin', name: 'KuCoin' },
        ]}
      />
      <Typography variant='h6' gutterBottom mt={1}>
        {translate('resources.codes.benefit')}
      </Typography>
      <NumberInput source='benefitDirect' />
      <NumberInput source='benefitBalanceFactor' />
      <NumberInput source='benefitDepositFactor' />
      <NumberInput source='maxTotalBenefits' />
      <Typography variant='h6' gutterBottom mt={1}>
        {translate('resources.codes.reward')}
      </Typography>
      <NumberInput source='rewardDirect' />
      <NumberInput source='rewardFactor' />
      <NumberInput source='rewardDepositFactor' />
      <NumberInput source='maxTotalRewards' />
      <Typography variant='h6' gutterBottom mt={1}>
        {translate('resources.codes.redemptions')}
      </Typography>
      <NumberInput source='currentRedemptions' defaultValue={0} />
      <NumberInput source='maxRedemptions' />
      <Typography variant='h6' gutterBottom mt={1}>
        {translate('resources.codes.dates')}
      </Typography>
      <DateTimeInput source='startDate' label='Start date' />
      <DateTimeInput source='endDate' label='End date' />
    </SimpleForm>
  );
};

export const CodeEdit = () => (
  <Edit>
    <CodeForm />
  </Edit>
);

export const CodeCreate = () => (
  <Create title='Create a Code'>
    <CodeForm />
  </Create>
);
