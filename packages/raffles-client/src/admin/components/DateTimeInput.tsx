import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, FormHelperText, TextField } from '@mui/material';
import { TextInputProps, useInput, useTranslate } from 'react-admin';

const getTimezoneOffset = (value: Date) => value.getTimezoneOffset() * 60000;

const makeLocalAppearUTC = (value: string) => {
  const dateTime = new Date(value);
  // if (isNaN(+dateTime)) {
  //   return value;
  // }
  const utcFromLocal = new Date(
    dateTime.getTime() + getTimezoneOffset(dateTime),
  );
  return utcFromLocal;
};

const localToUTC = (dateTime: Date): string | Date => {
  if (!dateTime || isNaN(+dateTime)) return dateTime;

  const utcFromLocal = new Date(
    dateTime.getTime() - getTimezoneOffset(dateTime),
  );
  return utcFromLocal;
};

const DateTimeInput = (props: TextInputProps) => {
  const { field, fieldState } = useInput(props);
  const translate = useTranslate();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display='flex' flexDirection='column' mb='10px'>
        <DateTimePicker
          label={props.label}
          inputFormat='yyyy-MM-dd HH:mm:ss'
          renderInput={(params) => (
            <TextField
              {...params}
              error={Boolean(fieldState.error)}
              required={props.required}
            />
          )}
          {...field}
          value={makeLocalAppearUTC(field.value)}
          onChange={(value) =>
            field.onChange({ target: { value: localToUTC(value) } })
          }
        />
        <FormHelperText error={Boolean(fieldState.error)}>
          {fieldState.error?.message
            ? translate(fieldState.error.message)
            : ' '}
        </FormHelperText>
      </Box>
    </LocalizationProvider>
  );
};

export default DateTimeInput;
