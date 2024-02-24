import React, { useMemo, useState } from 'react';
import {
  Service,
  TraderServiceAccessLevel,
} from '../../../../apis/service/types';
import { Box, Grid, InputAdornment } from '@mui/material';
import {
  ZigButton,
  ZigInput,
  ZigLink,
  ZigSelect,
  ZigTypography,
} from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import ServiceLogo from '../ServiceLogo';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditServiceValidation } from './validations';
import { Controller, useForm } from 'react-hook-form';
import { useTraderServiceEditMutation } from 'apis/service/api';
import { EditServiceForm, VISIBILITY_LABEL } from './types';
import { StyledZigSelect } from './styles';
import { HELP_CREATE_SERVICE_MARKETPLACE_URL } from 'util/constants';
import { generatePath, useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';
import { ROUTE_TRADING_SERVICE } from 'routes';
import { useCurrentUser } from 'apis/user/use';
import SuccessFeeInputWrapper from '../BecomeTraderLanding/modals/forms/SuccessFeeInputWrapper';
import CommissionReferralSharing from './atoms/CommissionReferralSharing';
import RichDescriptionEditor from './atoms/RichDescriptionEditor';
import { isFeatureOn, whitelabel } from 'whitelabel';
import { Features } from 'whitelabel/type';
import { useUpdateServiceCommissionMutation } from 'apis/referrals/api';
import {
  deserializeSlate,
  serializeSlate,
} from './atoms/RichDescriptionEditor/atoms/util';
import Deactivated from '../DeactivatedService';

const getVisibility = (level: TraderServiceAccessLevel) => {
  if (level < TraderServiceAccessLevel.Private) {
    return TraderServiceAccessLevel.Solo;
  } else if (level < TraderServiceAccessLevel.Public) {
    return TraderServiceAccessLevel.Private;
  } else if (level < TraderServiceAccessLevel.Marketplace) {
    return TraderServiceAccessLevel.Public;
  } else {
    return TraderServiceAccessLevel.Marketplace;
  }
};

const EditServiceProfileContainer: React.FC<{
  service: Service;
  commission?: number;
}> = ({ service, commission }) => {
  const { t } = useTranslation('service');
  const defaultValues = {
    name: service.name,
    description: deserializeSlate(service.description),
    maximumSbt: service.maximumSbt,
    successFee: service.successFee || 0,
    logo: service.logo,
    ...(isFeatureOn(Features.Referrals) && { commission }),
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<EditServiceForm>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: yupResolver(EditServiceValidation),
  });
  const [edit, editStatus] = useTraderServiceEditMutation();
  const [updateCommission, commissionStatus] =
    useUpdateServiceCommissionMutation();
  const [visibility, setVisibility] = useState<TraderServiceAccessLevel>(
    getVisibility(service.level),
  );
  const navigate = useNavigate();
  const user = useCurrentUser();
  const successFee = watch('successFee');

  const submit = async (data: EditServiceForm) => {
    const { commission: c, description, ...rest } = data;
    await Promise.all([
      edit({
        id: service.id,
        description: serializeSlate(description),
        ...rest,
        level: visibility,
        commission: c,
      }),
      ...(isFeatureOn(Features.Referrals)
        ? [
            updateCommission({
              serviceId: service.id,
              commission: c || 0,
            }),
          ]
        : []),
    ]);
    back();
  };

  useUpdateEffect(() => {
    reset(defaultValues);
    setVisibility(getVisibility(service.level));
  }, [service.id]);

  const visibilityOptions = useMemo(
    () => [
      {
        value: TraderServiceAccessLevel.Solo,
        label: t('edit.visibility.unlisted'),
        disabled: true,
      },
      {
        value: TraderServiceAccessLevel.Private,
        label: t('edit.visibility.private'),
      },
      {
        value: TraderServiceAccessLevel.Public,
        label: t('edit.visibility.public'),
      },
      {
        value: TraderServiceAccessLevel.Marketplace,
        label: t('edit.visibility.marketplace'),
        disabled: !user?.isSupport,
      },
    ],
    [t],
  );

  const selectStyles: React.ComponentProps<typeof ZigSelect>['styles'] = {
    option: (styles, { data }) => {
      const { value } = data as { value: number };
      if (
        value === TraderServiceAccessLevel.Solo ||
        (value === TraderServiceAccessLevel.Marketplace && !user?.isSupport)
      ) {
        return {
          display: 'none',
        };
      }
      return {
        ...styles,
        cursor: 'pointer',
        color: VISIBILITY_LABEL[value].color,
        fontSize: '17px',
        padding: '16px 14px',
      };
    },
  };

  const back = () =>
    navigate(
      generatePath(ROUTE_TRADING_SERVICE, {
        serviceId: service.id.toString(),
      }),
    );

  return (
    <Box onSubmit={handleSubmit(submit)} component='form'>
      {service?.activated === false && <Deactivated />}
      <ZigTypography
        textAlign='center'
        variant='h1'
        id={'edit-service-profile__title'}
      >
        {t('edit.title')}
      </ZigTypography>
      <Grid container mt={8} gap={2}>
        <Grid item sm={12} md={2} pb={2}>
          <Controller
            name='logo'
            control={control}
            render={({ field }) => (
              <ServiceLogo
                label={t('edit.logo')}
                {...field}
                id={'edit-service-profile__service-logo'}
              />
            )}
          />
        </Grid>
        <Grid container sm={12} md={7} pb={2} alignItems='flex-start' gap={6}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <ZigInput
                id={'edit-service-profile__service-name'}
                fullWidth
                label={t('edit.name')}
                error={t(errors.name?.message)}
                {...field}
              />
            )}
          />
          <Grid item xs={12} sm={12}>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <RichDescriptionEditor
                  setValue={setValue.bind(null, 'description')}
                  id={'edit-service-profile__service-description'}
                  label={
                    <ZigTypography mb={'10px'}>
                      {t('edit.description')}
                    </ZigTypography>
                  }
                  error={t(errors.description?.message)}
                  value={field.value}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='maximumSbt'
              control={control}
              render={({ field }) => (
                <ZigInput
                  id={'edit-service-profile__service-max-sbt'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        id={'edit-service-profile__service-max-sbt-coin'}
                      >
                        {service.ssc}
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label={
                    <div>
                      {t('edit.pool-size')}
                      <ZigTypography
                        variant='h4'
                        color='neutral400'
                        id={'edit-service-profile__pool-size-description'}
                      >
                        {t('edit.pool-size-desc')}
                      </ZigTypography>
                    </div>
                  }
                  error={t(errors.maximumSbt?.message)}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item container columnSpacing={6} rowSpacing={6}>
            <Grid item xs={12}>
              <Controller
                name='successFee'
                control={control}
                render={({ field }) => (
                  <SuccessFeeInputWrapper
                    prefixId={'edit-service-profile__service-success-fee'}
                    zglyFee={
                      service?.zglySuccessFee ||
                      service?.storedZglySuccessFee ||
                      whitelabel.zignalySuccessFee
                    }
                    value={successFee}
                    showZeroFeeExplainer
                  >
                    <ZigInput
                      id={'edit-service-profile__service-input-success-fee'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>%</InputAdornment>
                        ),
                      }}
                      label={t('create.total-fee')}
                      labelInline
                      error={t(errors.successFee?.message)}
                      {...field}
                    />
                  </SuccessFeeInputWrapper>
                )}
              />
            </Grid>
            {isFeatureOn(Features.Referrals) && (
              <Grid item xs={12}>
                <Controller
                  name='commission'
                  control={control}
                  render={({ field }) => (
                    <CommissionReferralSharing
                      prefixId={
                        'edit-service-profile__service-commission-slider'
                      }
                      successFee={+successFee}
                      zglySuccessFee={
                        service?.zglySuccessFee || whitelabel.zignalySuccessFee
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            columnSpacing={6}
            alignItems='center'
            rowSpacing={2}
          >
            <Grid item xs={12} sm={6}>
              <StyledZigSelect
                id={'edit-service-profile__service-visibility'}
                options={visibilityOptions}
                label={t('edit.visibility.visibility')}
                value={visibility}
                onChange={setVisibility}
                styles={selectStyles}
              />
              <ZigTypography
                variant='h4'
                color='neutral400'
                id={'edit-service-profile__service-visibility-label'}
              >
                {t(`edit.visibility.${VISIBILITY_LABEL[visibility].key}-desc`)}
              </ZigTypography>
            </Grid>
            <Grid
              item
              md={6}
              sm={12}
              alignItems='center'
              justifyContent='center'
              display='flex'
            >
              <ZigTypography
                variant='h4'
                color='neutral400'
                id={'edit-service-profile__service-marketplace-requirements'}
              >
                <Trans
                  i18nKey={'edit.visibility.marketplace-requirements'}
                  t={t}
                  components={[
                    <ZigLink
                      id={
                        'edit-service-profile__service-marketplace-requirements-link'
                      }
                      href={HELP_CREATE_SERVICE_MARKETPLACE_URL}
                      key={0}
                    />,
                  ]}
                />
              </ZigTypography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent='flex-end'
            spacing={1}
            gap={2}
            mb={2}
          >
            <ZigButton
              variant='outlined'
              size='large'
              onClick={back}
              id={'edit-service-profile__cancel'}
            >
              {t('action:cancel')}
            </ZigButton>
            <ZigButton
              variant='contained'
              type='submit'
              loading={editStatus.isLoading || commissionStatus.isLoading}
              size='large'
              id={'edit-service-profile__save'}
            >
              {t('edit.save')}
            </ZigButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditServiceProfileContainer;
