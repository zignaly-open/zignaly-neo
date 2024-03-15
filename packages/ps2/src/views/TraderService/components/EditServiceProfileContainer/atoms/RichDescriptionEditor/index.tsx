import React from 'react';
import { Box } from '@mui/material';
import { ErrorMessage, ZigTypography } from '@zignaly-open/ui';
import { SxProps } from '@mui/system';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { StyledEditor } from './styles';
import { ALLOWED_COMMANDS } from './constants';
import MarkdownSection from '../../../ServiceProfileContainer/atoms/MarkdownSection';
import { bold, italic } from '@uiw/react-md-editor';

const RichTextEditor = ({
  id,
  label,
  error,
  subtitle,
  sx,
  placeholder,
  ...props
}: Partial<ControllerRenderProps> & {
  id: string;
  label?: string | JSX.Element;
  error?: string;
  sx?: SxProps;
  placeholder?: string;
  subtitle?: JSX.Element | string;
}) => {
  return (
    <Box
      sx={{
        color: 'neutral200',
        fontSize: '15px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        ...sx,
      }}
    >
      {typeof label === 'string' ? (
        <ZigTypography
          variant={'h2'}
          sx={{ mb: 2 }}
          align='center'
          id={id && `${id}-label`}
        >
          {label}
        </ZigTypography>
      ) : (
        label
      )}
      {subtitle}
      <StyledEditor
        id={id}
        height={400}
        error={!!error}
        placeholder={placeholder}
        components={{
          preview: (source) => (
            <MarkdownSection content={source} readMore={false} sx={{ m: 0 }} />
          ),
        }}
        commandsFilter={(command) => {
          return ALLOWED_COMMANDS.includes(command.name) ||
            command.keyCommand === 'divider'
            ? command.name === 'italic' || command.name === 'bold'
              ? {
                  ...command,
                  execute: (state, api) => {
                    const state1 = api.setSelectionRange({
                      start: state.selection.start,
                      end: state.selectedText.endsWith('\n')
                        ? state.selection.end - 1
                        : state.selection.end,
                    });
                    api.replaceSelection(
                      state.selectedText.endsWith('\n')
                        ? state.selectedText.replace('\n', '')
                        : state.selectedText,
                    );
                    command.name === 'italic'
                      ? italic.execute(
                          {
                            ...state1,
                            command: state.command,
                          },
                          api,
                        )
                      : bold.execute(
                          {
                            ...state1,
                            command: state.command,
                          },
                          api,
                        );
                  },
                  prefix: command.name === 'italic' ? '_' : '**',
                }
              : command
            : false;
        }}
        {...props}
      />
      {error && <ErrorMessage text={error} id={id && `${id}-error-message`} />}
    </Box>
  );
};

export default RichTextEditor;
