import { useMutation } from '@apollo/client';
import { Box } from '@mui/material';
import useCurrentUser from 'hooks/useCurrentUser';
import { CLAIM, GET_AUCTIONS } from 'queries/auctions';
import React, { FormEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, InputText, Typography } from '@zignaly-open/ui';
import CongratulationsModal from '../Congratulations';
import DialogContainer from '../DialogContainer';
import { Form } from './styles';
import { ClaimModalProps } from './types';
import { showToast } from 'util/showToast';

const ClaimModal = ({ auction, ...props }: ClaimModalProps) => {
  const { t } = useTranslation(['claim', 'user-settings', 'global']);
  const {
    user: { discordName, publicAddress },
  } = useCurrentUser();

  const [success, setSuccess] = useState(auction.userBid?.isClaimed);
  const [claim, { loading }] = useMutation(CLAIM, {
    refetchQueries: [{ query: GET_AUCTIONS }],
  });

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        await claim({
          variables: {
            id: auction.id,
          },
        }).catch((err) => {
          throw err;
        });
        setSuccess(true);
      } catch (err) {
        showToast({ size: 'large', variant: 'error', caption: err.message });
      }
    },
    [auction],
  );

  if (success) {
    return <CongratulationsModal auction={auction} {...props} />;
  }

  return (
    <DialogContainer title={t('claim-instructions')} {...props}>
      <Typography color='neutral200'>{t('congratulations-winner')}</Typography>
      <br />
      <br />
      <Typography color='neutral200'>{t('verify')}</Typography>
      <Form onSubmit={submit}>
        <Typography color='neutral200'>{t('connected-wallet')}</Typography>
        <InputText
          name='publicAddress'
          value={publicAddress}
          placeholder={t('connected-wallet')}
          disabled={true}
          minHeight={1}
        />
        <Typography color='neutral200'>
          {t('discord-user-label', {
            ns: 'user-settings',
          })}
        </Typography>
        <Box mt='-8px'>
          <Typography color='neutral400' variant='h4'>
            {t('change')}
          </Typography>
        </Box>
        <InputText
          name='discordName'
          value={discordName}
          placeholder={t('please-enter-discord-user', {
            ns: 'user-settings',
          })}
          disabled={true}
          minHeight={1}
        />
        <Box
          gap='12px'
          display='flex'
          justifyContent='center'
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
          mt='40px'
        >
          <Button
            caption={t('cancel', {
              ns: 'global',
            })}
            variant='secondary'
            size='large'
            onClick={(e) => props.onClose(e, 'escapeKeyDown')}
            type='button'
          />
          <Button
            type='submit'
            loading={loading}
            caption={t('claim')}
            size='large'
            disabled={!discordName}
          />
        </Box>
      </Form>
    </DialogContainer>
  );
};

export default ClaimModal;
