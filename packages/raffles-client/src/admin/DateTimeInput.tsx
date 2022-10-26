import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useController } from 'react-hook-form';
import { TextField } from '@mui/material';

const getTimezoneOffset = (value: Date) => value.getTimezoneOffset() * 60000;

const makeLocalAppearUTC = (value: string) => {
  const dateTime = new Date(value);
  const utcFromLocal = new Date(
    dateTime.getTime() + getTimezoneOffset(dateTime),
  );
  return utcFromLocal;
};

const localToUTC = (dateTime: Date) => {
  const utcFromLocal = new Date(
    dateTime.getTime() - getTimezoneOffset(dateTime),
  );
  return utcFromLocal;
};

const DateTimeInput = ({
  source,
  required = false,
  label,
}: {
  source: string;
  label: string;
  required?: boolean;
}) => {
  const input = useController({
    name: source,
    defaultValue: '',
    rules: { required },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        inputFormat='yyyy/MM/dd hh:mm:ss'
        renderInput={(params) => {
          return <TextField {...params} />;
        }}
        {...input.field}
        value={makeLocalAppearUTC(input.field.value)}
        onChange={(value) =>
          input.field.onChange({ target: { value: localToUTC(value) } })
        }
      />
    </LocalizationProvider>
  );
};

export default DateTimeInput;
