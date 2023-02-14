import React from 'react';
import { FunctionField, RaRecord, TextFieldProps } from 'react-admin';
import { addMinutes, format } from 'date-fns';

const DateField = (props: TextFieldProps & { multiline?: boolean }) => {
  const { multiline, ...rest } = props;
  return (
    <FunctionField
      {...rest}
      render={(record: RaRecord) => {
        const date = record[props.source]
          ? new Date(record[props.source])
          : null;
        return (
          <span
            style={
              multiline
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
            {date
              ? format(
                  addMinutes(date, date.getTimezoneOffset()),
                  'yyyy‑MM‑dd HH:mm',
                )
              : ''}
          </span>
        );
      }}
    />
  );
};

export default DateField;
