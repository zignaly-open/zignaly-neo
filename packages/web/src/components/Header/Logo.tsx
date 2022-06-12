import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

const StyledLogo = styled(Typography)`
  text-transform: uppercase;
  font-weight: bold;
  text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
    0.025em 0.04em 0 #fffc00;
  animation: glitch 725ms infinite;

  @keyframes glitch {
    0% {
      text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
        0.025em 0.04em 0 #fffc00;
    }
    15% {
      text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
        0.025em 0.04em 0 #fffc00;
    }
    16% {
      text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
        -0.05em -0.05em 0 #fffc00;
    }
    49% {
      text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
        -0.05em -0.05em 0 #fffc00;
    }
    50% {
      text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
        0 -0.04em 0 #fffc00;
    }
    99% {
      text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
        0 -0.04em 0 #fffc00;
    }
    100% {
      text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
        -0.04em -0.025em 0 #fffc00;
    }
  }
`;

const Logo: React.FC = () => {
  const { t } = useTranslation('global');

  return (
    <StyledLogo
      fontSize={{
        sm: 20,
        md: 48,
        lg: 72,
      }}
      lineHeight={1}
      marginTop={2}
      textAlign='center'
      fontWeight={600}
    >
      {t('logo')}
      {/*https://codepen.io/cbanlawi/pen/xxRBeMY*/}
    </StyledLogo>
  );
};

export default Logo;
