import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  TextField,
  EmailField,
  SearchInput,
  Edit,
  SimpleForm,
  TextInput,
  FunctionField,
  Labeled,
  ListContextProvider,
  Title,
  NumberInput,
  ListBase,
  useSaveContext,
  SaveContextProvider,
  EditContextProvider,
  Loading,
  useGetOne,
  useDataProvider,
  useList,
  useGetList,
  useUpdate,
} from 'react-admin';
// import { useQuery } from 'react-query';

export const SettingList = () => (
  <List
    pagination={false}
    sx={{ maxWidth: '700px' }}
    actions={null}
    hasEdit={true}
  >
    <Datagrid bulkActionButtons={false}>
      <FunctionField
        label='Property'
        sortBy='key'
        render={(record) => `${record.key}`}
      />
      <TextField source='value' />
    </Datagrid>
  </List>
);

const CodeTitle = () => {
  const record = useRecordContext();
  return <span>Edit Code {record ? `"${record.code}"` : ''}</span>;
};

export const SettingEdit = () => (
  <Edit title={<CodeTitle />}>
    <SimpleForm>
      <TextInput source='value' required />
    </SimpleForm>
  </Edit>
);

export const SettingsPage = (p) => {
  const { data, isLoading, error } = useGetOne('Settings', { id: undefined });

  const [update, { isLoading: isSubmitting }] = useUpdate();
  const onSubmit = (data) => update('Settings', { data, id: undefined });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  return (
    <Card>
      <Title title='Settings' />
      <CardContent>
        <EditContextProvider
          value={{
            record: data,
            isLoading,
            save: onSubmit,
            saving: isSubmitting,
          }}
        >
          <SimpleForm sx={{ width: '400px' }}>
            <Typography variant='h6' gutterBottom>
              Benefit
            </Typography>
            <NumberInput source='benefitDirect' fullWidth />
            <NumberInput
              source='reqMinimumDeposit'
              label='Min deposit required'
              fullWidth
            />
            <NumberInput source='benefitDepositFactor' fullWidth />
            <NumberInput source='maxTotalBenefits' fullWidth />
            <Typography variant='h6' gutterBottom>
              Reward
            </Typography>
            <NumberInput source='rewardDirect' fullWidth />
            <NumberInput source='rewardDepositFactor' fullWidth />
            <NumberInput source='maxTotalRewards' fullWidth />
          </SimpleForm>
        </EditContextProvider>
      </CardContent>
    </Card>
  );
};
