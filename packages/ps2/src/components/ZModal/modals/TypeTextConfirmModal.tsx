import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import ZModal from '../index';
import { ConfirmModalProps } from './ConfirmModal';

export type TypeTextConfirmModalProps = {
  safeWord: string;
  noCancelButton: boolean;
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
  noCancelButton = false,
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
    <ZModal allowUnauth wide {...props} close={close} title={title}>
      {!!description && (
        <ZigTypography sx={{ mb: 1 }} textAlign={'center'}>
          {description}
        </ZigTypography>
      )}

      <ZigInput
        label={t('common:type-to-confirm', { word: safeWord })}
        onChange={(e) => {
          setConfirmWord(e.target.value);
        }}
        value={confirmWord}
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
          variant={'contained'}
          disabled={typedCorrectly}
          tooltip={
            typedCorrectly
              ? t('common:type-to-confirm', { word: safeWord })
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

        {!noCancelButton && (
          <ZigButton
            sx={{ ml: 1 }}
            variant={'outlined'}
            type='submit'
            size={'large'}
            onClick={() => {
              noAction?.();
              close();
            }}
          >
            {noLabel || t('cancel')}
          </ZigButton>
        )}
      </Box>
    </ZModal>
  );
}

export default TypeTextConfirmModal;
