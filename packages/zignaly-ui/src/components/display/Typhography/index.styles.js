// Dependencies
import styled from 'styled-components';
import { styledIf } from '@utils/styled';

export const Layout = styled.h1`
  font-family: 'Poppins', sans-serif;

  &.h1 {
    &.medium {
      font-weight: 600;
      font-size: 48px;
      line-height: 60px;
      letter-spacing: 1px;
    }
    
    &.small {
      font-weight: bold;
      font-size: 28px;
      line-height: 40px;
    }

    &.x-small {
      font-weight: bold;
      font-size: 20px;
      line-height: 28px;
    }
  }

  &.h2 {
    &.medium {
      font-size: 32px;
      line-height: 40px;
      font-weight: 300;
      letter-spacing: 0.66px;
    }
    
    &.small {
      font-weight: bold;
      font-size: 24px;
      line-height: 36px;
    }

    &.x-small {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
    }
  }

  &.h3 {
    &.medium {
      font-size: 24px;
      line-height: 32px;
      font-weight: 400;
      letter-spacing: 0.33px;
    }
    
    &.small {
      font-weight: bold;
      font-size: 20px;
      line-height: 28px;
    }

    &.x-small {
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
    }
  }

  &.h4 {
    &.medium {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }

    &.small {
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
    }

    &.x-small {
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
    }
  }

  &.h5 {
    &.medium {
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
    }

    &.small {
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
    }

    &.x-small {
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
  }

  &.h6 {
    &.medium {
      font-weight: 600;
      font-size: 11px;
      line-height: 14px;
      letter-spacing: 0.66px;
      text-transform: uppercase;
    }

    &.small {
      font-size: 11px;
      line-height: 14px;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }

    &.x-small {
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
  }
  
  &.body {
    &.medium {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.33px;
    }

    &.small {
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.33px;
    }

    &.x-small {
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
    }
  }
  
  ${props => `
    ${styledIf(props.weight, `
      font-weight: ${props.weight} !important;
    `)}
  `}

  &.style-number {
    letter-spacing: 1px;
  }
`;
