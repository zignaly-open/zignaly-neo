import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  Title,
  NumberInput,
  SaveContextProvider,
  useGetOne,
  useUpdate,
  useTranslate,
} from 'react-admin';

export const SettingEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source='value' required />
    </SimpleForm>
  </Edit>
);

export const SettingsPage = () => {
  const translate = useTranslate();
  const { data, isLoading, error } = useGetOne('Settings', { id: undefined });

  const [update, { isLoading: isSubmitting }] = useUpdate();
  const onSubmit = (newData: object) =>
    update('Settings', { data: newData, id: undefined });

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Card>
      <Title title='Settings' />
      <CardContent>
        <SaveContextProvider
          value={{
            record: data,
            isLoading,
            save: onSubmit,
            saving: isSubmitting,
          }}
        >
          <SimpleForm record={data} sx={{ width: '400px' }}>
            <Typography variant='h6' gutterBottom>
              {translate('resources.settings.defaultCodeBenefit')}
            </Typography>
            <NumberInput source='benefitDirect' fullWidth />
            <NumberInput source='benefitDepositFactor' fullWidth />
            <NumberInput source='maxTotalBenefits' fullWidth />
            <NumberInput
              source='reqMinimumDeposit'
              label='Min deposit required'
              fullWidth
            />
            <Typography variant='h6' gutterBottom>
              {translate('resources.settings.defaultCodeReward')}
            </Typography>
            <NumberInput source='rewardDirect' fullWidth />
            <NumberInput source='rewardDepositFactor' fullWidth />
            <NumberInput source='maxTotalRewards' fullWidth />
          </SimpleForm>
        </SaveContextProvider>
      </CardContent>
    </Card>
  );
};
