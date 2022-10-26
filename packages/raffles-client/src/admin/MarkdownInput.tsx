import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  styled,
} from '@mui/material';
import {
  TextInput,
  useInput,
  InputHelperText,
  Labeled,
  InputProps,
  TextInputProps,
} from 'react-admin';
import ReactMarkdown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';

const MarkdownInput = (props: TextInputProps) => {
  const { onChange, onBlur, ...rest } = props;
  const {
    field,
    fieldState: { isTouched, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput({
    // Pass the event handlers to the hook but not the component as the field property already has them.
    // useInput will call the provided onChange and onBlur in addition to the default needed by react-hook-form.
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
