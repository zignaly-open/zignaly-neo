import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, TextField } from '@mui/material';
import { InputHelperText, TextInputProps, useInput } from 'react-admin';

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

const DateTimeInput = (props: TextInputProps) => {
  const { field, fieldState } = useInput(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display='flex' flexDirection='column'>
        <DateTimePicker
          label={props.label}
          inputFormat='yyyy-MM-dd HH:mm:ss'
          renderInput={(params) => (
            <TextField
              size='small'
              {...params}
              error={Boolean(fieldState.error)}
            />
          )}
          {...field}
          value={makeLocalAppearUTC(field.value)}
          onChange={(value) =>
            field.onChange({ target: { value: localToUTC(value) } })
          }
        />
        <InputHelperText
          touched={fieldState.isTouched}
          error={fieldState.error?.message}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateTimeInput;
