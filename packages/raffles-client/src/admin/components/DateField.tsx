import React from 'react';
import { FunctionField, RaRecord, TextFieldProps } from 'react-admin';
import { format } from 'date-fns';

const DateField = (props: TextFieldProps & { multiline?: boolean }) => {
  return (
    <FunctionField
      {...props}
      render={(record: RaRecord) => (
        <span
          style={
            props.multiline
              ? {
                  width: '73px',
                  display: 'flex',
                  textAlign: 'center',
                }
              : {
                  whiteSpace: 'nowrap',
                }
          }
        >
          {record[props.source]
            ? format(new Date(record[props.source]), 'yyyy‑MM‑dd HH:mm')
            : ''}
        </span>
      )}
    />
  );
};

export default DateField;
