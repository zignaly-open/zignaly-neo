import React from 'react';
import { Button, Typography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { useZModal } from '../../../../../components/ZModal/use';
import DepositModal from '../DepositModal';
import { Box, Divider, Link } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { PURCHASE_CRYPTO } from '../../../../../util/constants';

const ChooseDepositType: React.FC<{
  coin: string;
  ctaId?: string;
  close: () => void;
}> = ({ coin, ctaId = '', close }) => {
  const { t } = useTranslation('purchase-deposit-crypto');
  const { showModal } = useZModal();
  return (
    <>
      <Box padding={'15px 0'}>
        <Typography variant={'body2'}>{t('description', { coin })}</Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        height={200}
        paddingTop={'25px'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          width={'100%'}
          padding={'0 75px'}
        >
          <Box
            textAlign={'center'}
            height={100}
            paddingTop={'15px'}
            lineHeight={2}
          >
            <Typography variant={'body1'} color={'neutral100'}>
              {t('transfer-crypto', { coin })}
            </Typography>
          </Box>

          <Button
            maxHeight={500}
            id={'choose-deposit-type__deposit'}
            size={'large'}
            caption={t('buttons.deposit', { coin })}
            onClick={() => {
              close();
              showModal(DepositModal, {
                allowedCoins: [coin],
                ctaId,
              });
            }}
          />
        </Box>

        <Divider
          sx={{ border: '1px solid #A8A8A830' }}
          orientation={'vertical'}
          flexItem
          variant={'middle'}
          role={'presentation'}
        />
        <Box
          width={'100%'}
          padding={'0 75px'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Box textAlign={'center'} height={100} paddingTop={'15px'}>
            <Typography variant={'body1'} color={'neutral100'}>
              {t('buy-crypto', { coin })}
            </Typography>
          </Box>
          <Link href={PURCHASE_CRYPTO} target={'_blank'}>
            <Button
              id={'choose-deposit-type__purchase'}
              size={'large'}
              caption={t('buttons.purchase', { coin })}
              rightElement={
                <NorthEastIcon sx={{ width: '1px' }} color={'white'} />
              }
            />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default ChooseDepositType;
