import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import {
  ZigAlertMessage,
  ZigButton,
  ZigButtonProps,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/system';
import ZModal from '../index';

export type PromptModalProps = {
  title: string | JSX.Element;
  description?: string | JSX.Element;
  confirmAction: (v: string) => void;
  confirmButtonProps?: Partial<ZigButtonProps>;
  prefixId?: string;
  label?: string;
  placeholder?: string;
  rulesFunction?: (v: string) => boolean;
  warning?: string;
};

function PromptModal({
  close,
  title,
  description,
  confirmAction,
  confirmButtonProps,
  prefixId,
  label,
  placeholder,
  rulesFunction,
  warning,
  ...props
}: {
  close: () => void;
} & PromptModalProps &
  DialogProps): React.ReactElement {
  const { t } = useTranslation(['action', 'error']);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={title}
      id={prefixId}
      mobileFullScreen
    >
      {!!description && (
        <ZigTypography
          sx={{ mb: 1 }}
          textAlign={'center'}
          id={prefixId && `${prefixId}__type-text-description`}
        >
          {description}
        </ZigTypography>
      )}

      <ZigInput
        id={prefixId && `${prefixId}__type-text-input`}
        label={label}
        onChange={(e) => {
          setError('');
          setValue(e.target.value);
        }}
        placeholder={placeholder}
        value={value}
        error={error}
        fullWidth
        sx={{ mb: 2 }}
      />
      {warning && (
        <ZigAlertMessage
          text={warning}
          id={prefixId && `${prefixId}__type-text-warning`}
        />
      )}

      <Box
        sx={{
          mt: 5,
          ml: 'auto',
          mr: 'auto',
        }}
      >
        <ZigButton
          id={prefixId && `${prefixId}__type-text-confirm`}
          disabled={!!error}
          type='submit'
          size={'large'}
          onClick={() => {
            if (rulesFunction(value)) {
              confirmAction(value);
              close();
            } else {
              setError(t('error:error.wrong-value'));
            }
          }}
          {...(confirmButtonProps || {})}
        >
          {t('confirm')}
        </ZigButton>
      </Box>
    </ZModal>
  );
}

export default PromptModal;
