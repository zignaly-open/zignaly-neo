import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@zignaly-open/ui';
import { useServiceDetails } from '../../use';
import { Center } from '../ServiceManagementsContainer/styles';
import ComingSoon from '../../../../components/ComingSoon';

const ServiceProfileContainer: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { t } = useTranslation('pages');
  const { isLoading: isLoadingService } = useServiceDetails(serviceId);
  return (
    <>
      {isLoadingService ? (
        <Center>
          <Loader
            color={'#fff'}
            width={'40px'}
            height={'40px'}
            ariaLabel={t('investors.loading-arialLabel')}
          />
        </Center>
      ) : (
        <ComingSoon />
      )}
    </>
  );
};

export default ServiceProfileContainer;
