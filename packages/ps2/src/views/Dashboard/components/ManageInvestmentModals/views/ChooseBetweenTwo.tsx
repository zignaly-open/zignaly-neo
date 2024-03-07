import React from 'react';
import { ZigButton, ZigButtonProps, ZigTypography } from '@zignaly-open/ui';
import { Box, Divider, Grid, useMediaQuery, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/system';

type ExtendedTypographyProps = TypographyProps & { id: string };
export type ChooseBetweenTwoProps = {
  description?: string | JSX.Element;
  descriptionProps?: Partial<ExtendedTypographyProps>;
  explainer1?: string | JSX.Element;
  explainer1Props?: Partial<ExtendedTypographyProps>;
  explainer2?: string | JSX.Element;
  explainer2Props?: Partial<ExtendedTypographyProps>;
  cta1?: string | JSX.Element;
  button1Props?: ZigButtonProps;
  cta2?: string | JSX.Element;
  button2Props?: ZigButtonProps;
  rightOption?: JSX.Element;
  leftOption?: JSX.Element;
  rightOptionSize?: number;
  leftOptionSize?: number;
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
  rightOption,
  leftOption,
  leftOptionSize = 5,
  rightOptionSize = 5,
}) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('md'));
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
          sx={{ paddingTop: '25px' }}
        >
          <Grid item xs={12} md={leftOptionSize}>
            {leftOption ? (
              leftOption
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Box
                  height={sm ? 50 : 90}
                  sx={{
                    textAlign: 'center',
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
            )}
          </Grid>

          {sm && (
            <Box px={8} py={4} sx={{ width: '100%' }}>
              <Divider
                sx={{
                  marginTop: 1,
                  width: '100%',
                  borderTop: `1px solid ${theme.palette.neutral500}`,
                }}
                orientation={'horizontal'}
                flexItem
                role={'presentation'}
              />
            </Box>
          )}

          <Grid item container xs={false} md={1} justifyContent='center'>
            <Divider
              sx={{ border: '1px dotted #A8A8A830' }}
              orientation={'vertical'}
              flexItem
              role={'presentation'}
            />
          </Grid>

          <Grid item xs={12} md={rightOptionSize} marginLeft={'5px'}>
            {rightOption || (
              <Box
                sx={{
                  textAlign: 'center',
                }}
              >
                <Box
                  textAlign={'center'}
                  height={sm ? 50 : 90}
                  paddingTop={'10px'}
                >
                  <ZigTypography variant={'h3'} {...(explainer2Props || {})}>
                    {explainer2}
                  </ZigTypography>
                </Box>
                <ZigButton variant='contained' size={'large'} {...button2Props}>
                  {cta2}
                </ZigButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ChooseBetweenTwo;
