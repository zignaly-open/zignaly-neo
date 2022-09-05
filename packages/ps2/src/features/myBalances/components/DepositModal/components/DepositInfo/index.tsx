import React from 'react';
import { CoinDetail, CoinNetwork } from '../../../../types';
import { ErrorMessage, InputText, Loader, QRCode } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Field } from '../../styles';
import { useDepositInfo } from '../../../../use';

const DepositInfo = ({
  coin,
  network,
}: {
  coin: CoinDetail;
  network: CoinNetwork;
}): React.ReactElement => {
  const { t } = useTranslation('deposit-crypto');
  const { data, isLoading } = useDepositInfo(coin.id, network.network);
  const depositTag = data && data.tag.trim().length ? data.tag : null;

  return network && !network.depositEnable ? (
    <ErrorMessage text={network.depositDesc} />
  ) : (
    <>
      {isLoading ? (
        <Field className={'loader'}>
          <Loader
            color={'#fff'}
            ariaLabel={t('deposit-crypto.depositAddress.loading')}
            width={'32px'}
            height={'32px'}
          />
        </Field>
      ) : (
        <>
          <Field className={'column'}>
            <InputText
              label={t('deposit-crypto.depositAddress.label')}
              value={isLoading || !network ? '' : data?.address ?? ''}
              readOnly={true}
              placeholder={
                isLoading
                  ? t('deposit-crypto.depositAddress.loading')
                  : t('deposit-crypto.depositAddress.placeholder')
              }
            />
            {!isLoading && data?.address && network && coin && (
              <ErrorMessage
                text={t('deposit-crypto.depositAddress.warning', {
                  network: network.name,
                  coin: coin.id,
                })}
              />
            )}
          </Field>

          {depositTag && coin && network && (
            <Field className={'column'}>
              <InputText
                label={t('deposit-crypto.depositMemo.label')}
                value={depositTag}
                readOnly={true}
              />
            </Field>
          )}
          {data?.address && coin && network && (
            <Field className={'qrCode'}>
              <QRCode
                label={
                  depositTag &&
                  t('deposit-crypto.depositQR.address', {
                    coin: coin.id,
                  })
                }
                includeMargin={true}
                size={200}
                value={data.address}
              />

              {depositTag && coin && (
                <QRCode
                  label={t('deposit-crypto.depositQR.memo', {
                    coin: coin.id,
                  })}
                  includeMargin={true}
                  size={200}
                  value={depositTag}
                />
              )}
            </Field>
          )}
        </>
      )}
    </>
  );
};

export default DepositInfo;
