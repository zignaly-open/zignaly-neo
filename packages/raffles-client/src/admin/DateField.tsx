import React from 'react';
import { FunctionField, RaRecord, TextFieldProps } from 'react-admin';
import { format } from 'date-fns';

const DateField = (props: TextFieldProps) => {
  return (
    <FunctionField
      {...props}
      render={(record: RaRecord) =>
        record[props.source]
          ? format(new Date(record[props.source]), 'yyyy‑MM‑dd hh:mmaaa')
          : ''
      }
    />
  );
};

export default DateField;
