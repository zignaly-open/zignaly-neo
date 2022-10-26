import React from 'react';
import { Box } from '@mui/material';
import {
  useInput,
  InputHelperText,
  Labeled,
  TextInputProps,
} from 'react-admin';
import MDEditor from '@uiw/react-md-editor';

const MarkdownInput = (props: TextInputProps) => {
  const { onChange, onBlur, ...rest } = props;
  const {
    field,
    fieldState: { isTouched, error },
  } = useInput({
    onChange,
    onBlur,
    ...props,
  });

  return (
    <Box
      mt='8px'
      mb='4px'
      width='100%'
      data-color-mode='light'
      display='flex'
      flexDirection='column'
      gap='4px'
    >
      <Labeled label={props.label} isRequired={rest.required}>
        <MDEditor height={300} {...field} />
      </Labeled>
      <InputHelperText touched={isTouched} error={error?.message} />
    </Box>
  );
};

export default MarkdownInput;
