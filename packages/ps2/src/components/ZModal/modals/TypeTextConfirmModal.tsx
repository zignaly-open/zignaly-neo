import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import ZModal from '../index';
import { ConfirmModalProps } from './ConfirmModal';

export type TypeTextConfirmModalProps = {
  safeWord: string;
  cancelButton: boolean;
} & ConfirmModalProps;

function TypeTextConfirmModal({
  close,
  title,
  description,
  yesLabel,
  yesAction,
  safeWord = 'Fluggaenkoecchicebolsen',
  yesButtonProps,
  noLabel,
  noAction,
  cancelButton = true,
  prefixId,
  ...props
}: {
  close: () => void;
} & TypeTextConfirmModalProps &
  DialogProps): React.ReactElement {
  const { t } = useTranslation('action');
  const [confirmWord, setConfirmWord] = useState('');
  const typedCorrectly =
    confirmWord?.toLocaleLowerCase() !== safeWord.toLocaleLowerCase();
  return (
    <ZModal
      allowUnauth
      wide
      {...props}
      close={close}
      title={title}
      id={prefixId}
    >
      {!!description && (
        <ZigTypography
          sx={{ mb: 1 }}
          textAlign={'center'}
          id={prefixId && `${prefixId}__description`}
        >
          {description}
        </ZigTypography>
      )}

      <ZigInput
        id={prefixId && `${prefixId}__type-to-confirm`}
        label={t('common:type-to-confirm', { word: safeWord.toUpperCase() })}
        onChange={(e) => {
          setConfirmWord(e.target.value);
        }}
        value={confirmWord}
        placeholder={safeWord.toUpperCase()}
        fullWidth
      />

      <Box
        sx={{
          mt: 5,
          ml: 'auto',
          mr: 'auto',
        }}
      >
        <ZigButton
          id={prefixId && `${prefixId}__confirm`}
          disabled={typedCorrectly}
          tooltip={
            typedCorrectly
              ? t('common:type-to-confirm', { word: safeWord.toUpperCase() })
              : undefined
          }
          type='submit'
          size={'large'}
          onClick={() => {
            yesAction();
            close();
          }}
          {...(yesButtonProps || {})}
        >
          {yesLabel || t('confirm')}
        </ZigButton>

        {cancelButton && (
          <ZigButton
            sx={{ ml: 1 }}
            variant={'outlined'}
            type='submit'
            size={'large'}
            onClick={() => {
              noAction?.();
              close();
            }}
            id={prefixId && `${prefixId}__cancel`}
          >
            {noLabel || t('cancel')}
          </ZigButton>
        )}
      </Box>
    </ZModal>
  );
}

export default TypeTextConfirmModal;
