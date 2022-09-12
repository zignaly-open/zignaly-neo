import { AuctionType } from '@zignaly-open/raffles-shared/types';
import ClaimModal from 'components/Modals/Claim';
import { useModal } from 'mui-modal-provider';
import React, { useMemo } from 'react';
import ClaimCountdown from './ClaimCountdown';
import { Button, TimeIcon } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import useUpdatedAt from 'hooks/useUpdatedAt';

const ClaimButton = ({
  auction,
  disabled,
  claimCaption = 'claim-now',
  type,
  loading,
}: {
  auction: AuctionType;
  disabled?: boolean;
  loading?: boolean;
  claimCaption?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
  const { showModal } = useModal();
  const { t } = useTranslation('auction');

  const updatedAt = useUpdatedAt(auction.maxClaimDate, 0);

  const { canClaim, missClaim } = useMemo(() => {
    const maxClaimDateExpired =
      auction.maxClaimDate && new Date(auction.maxClaimDate) < new Date();

    return {
      canClaim: !auction.userBid?.isClaimed && !maxClaimDateExpired,
      missClaim: !auction.userBid?.isClaimed && maxClaimDateExpired,
    };
  }, [updatedAt]);

  return (
    <Button
      loading={loading}
      type={type}
      variant={missClaim ? 'secondary' : 'primary'}
      size='large'
      onClick={() =>
        showModal(ClaimModal, {
          auction,
        })
      }
      disabled={disabled || missClaim}
      caption={t(
        missClaim
          ? 'ended'
          : auction.userBid?.isClaimed
          ? 'instructions'
          : claimCaption,
      )}
      bottomElement={
        canClaim && auction.maxClaimDate ? (
          <ClaimCountdown date={auction.maxClaimDate} started={true} />
        ) : null
      }
      leftElement={
        canClaim && auction.maxClaimDate ? (
          <TimeIcon height={21} width={21} />
        ) : null
      }
    />
  );
};

export default ClaimButton;
