import React, { useMemo, useState } from 'react';
import {
  EditServicePayload,
  Service,
  TraderServiceAccessLevel,
} from '../../../../apis/service/types';
import { Box, Grid, InputAdornment } from '@mui/material';
import {
  ZigButton,
  ZigInput,
  ZigSelect,
  ZigTypography,
} from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import ServiceLogo from '../ServiceLogo';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditServiceValidation } from './validations';
import { Controller, useForm } from 'react-hook-form';
import { useTraderServiceEditMutation } from 'apis/service/api';
import { VISIBILITY_LABEL } from './types';
import { StyledZigSelect } from './styles';
import { ExternalLink } from 'components/AnchorLink';
import { HELP_CREATE_SERVICE_MARKETPLACE_URL } from 'util/constants';
import { generatePath, useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';
import { ROUTE_TRADING_SERVICE } from 'routes';
import { useCurrentUser } from 'apis/user/use';
import SuccessFeeInputWrapper from '../BecomeTraderLanding/modals/forms/SuccessFeeInputWrapper';

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

const EditServiceProfileContainer: React.FC<{ service: Service }> = ({
  service,
}) => {
  const { t } = useTranslation('service');
  const defaultValues = {
    name: service.name,
    description: service.description,
    // maximumSbt: service.maximumSbt,
    successFee: service.successFee,
    logo: service.logo,
  };
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<EditServicePayload>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: yupResolver(EditServiceValidation),
  });
  const [edit, editStatus] = useTraderServiceEditMutation();
  const [visibility, setVisibility] = useState<TraderServiceAccessLevel>(
    getVisibility(service.level),
  );
  const navigate = useNavigate();
  const user = useCurrentUser();

  const submit = async (data: EditServicePayload) => {
    await edit({ id: service.id, ...data, level: visibility });
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
    <Box onSubmit={handleSubmit(submit)} component='form' pt={7}>
      <ZigTypography textAlign='center' variant='h1'>
        {t('edit.title')}
      </ZigTypography>
      <Grid container mt={8} gap={2}>
        <Grid item sm={12} md={2} pb={2}>
          <Controller
            name='logo'
            control={control}
            render={({ field }) => <ServiceLogo service={service} {...field} />}
          />
        </Grid>
        <Grid container sm={12} md={7} pb={2} alignItems='flex-start' gap={6}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <ZigInput
                fullWidth
                label={t('edit.name')}
                error={t(errors.name?.message)}
                {...field}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <ZigInput
                fullWidth
                label={t('edit.description')}
                error={t(errors.description?.message)}
                multiline
                inputProps={{
                  style: {
                    height: '384px',
                  },
                }}
                {...field}
              />
            )}
          />
          <Grid item container columnSpacing={6} rowSpacing={6}>
            <Grid item md={8} sm={8} xs={12}>
              <Controller
                name='successFee'
                control={control}
                render={({ field }) => (
                  <SuccessFeeInputWrapper value={watch('successFee') || 0}>
                    <ZigInput
                      type='number'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>%</InputAdornment>
                        ),
                      }}
                      fullWidth
                      label={
                        <div>
                          {t('summary.success-fee')}
                          <ZigTypography variant='h4' color='neutral400'>
                            {t('edit.success-fee-desc')}
                          </ZigTypography>
                        </div>
                      }
                      error={t(errors.successFee?.message)}
                      {...field}
                    />
                  </SuccessFeeInputWrapper>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              }}
            />
            {/* <Grid item xs={12} sm={6}>
              <Controller
                name='maximumSbt'
                control={control}
                render={({ field }) => (
                  <ZigInput
                    type='number'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          {service.ssc}
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    label={
                      <div>
                        {t('edit.pool-size')}
                        <ZigTypography variant='h4' color='neutral400'>
                          {t('edit.pool-size-desc')}
                        </ZigTypography>
                      </div>
                    }
                    error={t(errors.maximumSbt?.message)}
                    {...field}
                  />
                )}
              />
            </Grid> */}
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
                options={visibilityOptions}
                label={t('edit.visibility.visibility')}
                value={visibility}
                onChange={setVisibility}
                styles={selectStyles}
              />
              <ZigTypography variant='h4' color='neutral400'>
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
              <ZigTypography variant='h4' color='neutral400'>
                <Trans
                  i18nKey={'edit.visibility.marketplace-requirements'}
                  t={t}
                  components={[
                    <ExternalLink
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
            <ZigButton variant='outlined' size='large' onClick={back}>
              {t('action:cancel')}
            </ZigButton>
            <ZigButton
              variant='contained'
              type='submit'
              loading={editStatus.isLoading}
              size='large'
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
