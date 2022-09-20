import { useMutation } from '@apollo/client';
import { Box } from '@mui/material';
import useCurrentUser from 'hooks/useCurrentUser';
import { CLAIM, GET_AUCTIONS } from 'queries/auctions';
import React, { FormEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@zignaly-open/ui';
import CongratulationsModal from '../Congratulations';
import DialogContainer from '../DialogContainer';
import { Form, Separator } from './styles';
import { ClaimModalProps } from './types';
import { showToast } from 'util/showToast';
import ClaimButton from 'components/Auctions/AuctionCard/ClaimButton';
import useBalance from 'hooks/useBalance';
import { ReactComponent as ZigCoinIcon } from 'assets/icons/zig-coin.svg';
import { PriceLabel } from 'components/Auctions/AuctionCard/styles';
import { useModal } from 'mui-modal-provider';
import UserSettingsModal from '../UserSettings';
import TransferZigModal from '../TransferZig';

enum ClaimState {
  NoDiscord,
  NotEnoughFunds,
  Claimed,
  NotClaimed,
}

const ClaimModal = ({ auction, ...props }: ClaimModalProps) => {
  const { t } = useTranslation(['claim', 'user-settings', 'global']);
  const {
    user: { discordName, publicAddress },
  } = useCurrentUser();
  const { balance, loading: balanceLoading } = useBalance();
  const { showModal } = useModal();
  const [claim, { data: claimResponse }] = useMutation(CLAIM, {
    refetchQueries: [{ query: GET_AUCTIONS }],
  });
  const [loading, setLoading] = useState(false);

  const claimState = useMemo(() => {
    if (auction.userBid?.isClaimed || claimResponse?.claim) {
      return ClaimState.Claimed;
    } else if (!discordName) {
      return ClaimState.NoDiscord;
    } else if (!balanceLoading && balance < parseFloat(auction.currentBid)) {
      return ClaimState.NotEnoughFunds;
    } else {
      return ClaimState.NotClaimed;
    }
  }, [discordName, balance, balanceLoading, auction, claimResponse]);

  const submit = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();
        if (claimState === ClaimState.NoDiscord) {
          showModal(UserSettingsModal);
        } else if (claimState === ClaimState.NotEnoughFunds) {
          showModal(TransferZigModal);
        } else {
          setLoading(true);
          await claim({
            variables: {
              id: auction.id,
            },
          });
        }
      } catch (err) {
        showToast({ size: 'large', variant: 'error', caption: err.message });
      } finally {
        setLoading(false);
      }
    },
    [auction],
  );

  if (claimState === ClaimState.Claimed) {
    return <CongratulationsModal auction={auction} {...props} />;
  }

  return (
    <DialogContainer title={t('claim-instructions')} {...props}>
      <Typography color='neutral200'>{t('congratulations-winner')}</Typography>
      <br />
      {/* <br /> */}
      {/* <Typography color='neutral200'>{t('verify')}</Typography> */}
      <Form onSubmit={submit}>
        <Typography color='neutral300'>{t('connected-wallet')}</Typography>
        <Typography color='neutral200'>{publicAddress}</Typography>
        {discordName && (
          <>
            <Typography color='neutral300'>{t('discord-user')}</Typography>
            <Typography color='neutral200'>{discordName}</Typography>
            <Typography color='neutral400' variant='h4'>
              {t('change')}
            </Typography>
          </>
        )}
        <Separator />
        <Box display='flex' justifyContent='space-evenly'>
          <Box display='flex' flexDirection='column' mr={2}>
            <Typography color='neutral300'>{t('prize')}</Typography>
            <Typography color='neutral200'>{auction.title}</Typography>
          </Box>
          <Box display='flex' flexDirection='column'>
            <Typography color='neutral300'>{t('amount')}</Typography>
            <Box display='flex'>
              <ZigCoinIcon width={24} height={24} />
              <PriceLabel value={auction.currentBid} coin='ZIG' />
            </Box>
          </Box>
        </Box>
        <Box mt={3} textAlign='center'>
          <Typography component='div' color='neutral200'>
            {t(
              claimState === ClaimState.NoDiscord
                ? 'set-discord-info'
                : claimState === ClaimState.NotEnoughFunds
                ? 'transfer-zig-info'
                : 'agree',
            )}
          </Typography>
        </Box>
        <Box
          gap='12px'
          display='flex'
          justifyContent='center'
          sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' } }}
          mt={2}
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
          <ClaimButton
            loading={loading}
            type='submit'
            auction={auction}
            onClick={() => {}}
            claimCaption={t(
              claimState === ClaimState.NoDiscord
                ? 'set-discord'
                : claimState === ClaimState.NotEnoughFunds
                ? 'transfer-zig'
                : 'claim',
            )}
          />
        </Box>
      </Form>
    </DialogContainer>
  );
};

export default ClaimModal;
