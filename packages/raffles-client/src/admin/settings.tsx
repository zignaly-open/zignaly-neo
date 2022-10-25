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
