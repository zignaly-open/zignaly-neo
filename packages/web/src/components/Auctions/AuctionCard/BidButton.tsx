import { useMutation } from '@apollo/client';
import { BID_AUCTION } from '../queries';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { AuctionType } from '@zigraffle/shared/types';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

const Button = styled(LoadingButton)`
  flex: 1;
  min-height: 50px;
`;

const BidButton: React.FC<{ auction: AuctionType }> = ({ auction }) => {
  const [bid, { loading: isBidding }] = useMutation(BID_AUCTION);
  const { user: currentUser } = useCurrentUser();
  const { t } = useTranslation('auction');
  return (
    <Button
      variant={'contained'}
      loading={isBidding}
      disabled={isBidding}
      size='large'
      onClick={() => {
        return currentUser?.id
          ? bid({
              variables: {
                id: auction.id,
                value: auction.minimalBid,
              },
            }).catch((e) => {
              // TODO: better alerts
              alert(e.toString());
            })
          : alert('Not logged in');
      }}
    >
      {t('make-bid', { bid: auction.minimalBid })}
    </Button>
  );
};

export default BidButton;
