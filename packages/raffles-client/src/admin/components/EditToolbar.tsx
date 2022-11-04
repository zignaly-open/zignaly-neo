import React from 'react';
import {
  DeleteWithConfirmButton,
  SaveButton,
  Toolbar,
  ToolbarProps,
  useRecordContext,
} from 'react-admin';

const EditToolbar = (props: ToolbarProps) => {
  const record = useRecordContext();
  return (
    <Toolbar
      sx={{ display: 'flex', justifyContent: 'space-between' }}
      {...props}
    >
      <SaveButton />
      {record && (
        <DeleteWithConfirmButton translateOptions={{ name: record.title }} />
      )}
    </Toolbar>
  );
};

export default EditToolbar;
