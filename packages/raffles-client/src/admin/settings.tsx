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
} from 'react-admin';
import { useList } from 'react-use';

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

export const SettingsPage = () => {
  // const {
  //   // save, // the create or update callback, which receives the form data and calls the dataProvider
  //   saving, //  boolean that becomes true when the dataProvider is called
  //   mutationMode, // the current mutation mode, either 'undoable', 'optimistic', or 'pessimistic'
  // } = useSaveContext();
  const saving = false;

  const save = (data) => {
    console.log(data);
  };

  return (
    <Card>
      <Title title='My Page' />
      <ListBase resource='Setting'>
        <CardContent>
          <SaveContextProvider
            value={{ save, saving, mutationMode: 'undoable' }}
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
          </SaveContextProvider>
        </CardContent>
      </ListBase>
    </Card>
  );
};

// export const SettingList = (p) => {
//   console.log(p);
//   const listContext = useList({ data });
//   console.log(data);

//   return (
//     <ListContextProvider value={listContext}>
//       <Edit>
//         <SimpleForm>
//           <TextInput source='' label='defaultRenefitDirect' value={'a'} />
//         </SimpleForm>
//       </Edit>
//     </ListContextProvider>
//   );
// };
