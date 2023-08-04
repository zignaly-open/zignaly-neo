import React from 'react';
import { ZigButton, ZigButtonProps, ZigTypography } from '@zignaly-open/ui';
import { Box, Divider, Grid } from '@mui/material';
import { TypographyProps } from '@mui/system';

type ExtendedTypographyProps = TypographyProps & { id: string };
export type ChooseBetweenTwoProps = {
  description?: string | JSX.Element;
  descriptionProps?: Partial<ExtendedTypographyProps>;
  explainer1?: string | JSX.Element;
  explainer1Props?: Partial<ExtendedTypographyProps>;
  explainer2?: string | JSX.Element;
  explainer2Props?: Partial<ExtendedTypographyProps>;
  cta1: string | JSX.Element;
  button1Props?: ZigButtonProps;
  cta2: string | JSX.Element;
  button2Props?: ZigButtonProps;
};

// we kinda don't reuse this shit except 1 case when we do
const ChooseBetweenTwo: React.FC<ChooseBetweenTwoProps> = ({
  button1Props,
  button2Props,
  cta1,
  cta2,
  description,
  descriptionProps,
  explainer1,
  explainer1Props,
  explainer2,
  explainer2Props,
}) => {
  return (
    <>
      <Grid container sx={{ padding: '10px 0' }}>
        <Grid item xs={12} sx={{ paddingRight: '10px', textAlign: 'center' }}>
          <ZigTypography variant={'body1'} {...(descriptionProps || {})}>
            {description}
          </ZigTypography>
        </Grid>
        <Grid
          item
          container
          justifyContent='center'
          sx={{ height: '160px', paddingTop: '25px' }}
        >
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  height: '90px',
                  paddingTop: '10px',
                  lineHeight: 2,
                }}
              >
                <ZigTypography variant={'h3'} {...(explainer1Props || {})}>
                  {explainer1}
                </ZigTypography>
              </Box>

              <ZigButton variant='contained' size={'large'} {...button1Props}>
                {cta1}
              </ZigButton>
            </Box>
          </Grid>

          <Grid item container xs={false} md={1} justifyContent='center'>
            <Divider
              sx={{ border: '1px dotted #A8A8A830' }}
              orientation={'vertical'}
              flexItem
              role={'presentation'}
            />
          </Grid>

          <Grid item xs={12} md={5} marginLeft={'5px'}>
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Box textAlign={'center'} height={90} paddingTop={'10px'}>
                <ZigTypography variant={'h3'} {...(explainer2Props || {})}>
                  {explainer2}
                </ZigTypography>
              </Box>
              <ZigButton variant='contained' size={'large'} {...button2Props}>
                {cta2}
              </ZigButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ChooseBetweenTwo;