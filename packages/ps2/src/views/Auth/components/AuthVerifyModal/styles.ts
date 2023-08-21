import { styled } from '@mui/material';

export const Container = styled('div')<{ isSeveralCodes?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 60px;
  overflow-y: hidden;
  ${(props) => `
  form > fieldset > :first-child {
    margin-bottom: ${props.isSeveralCodes && '0'};
  }
    
  `}
`;

export const Title = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  text-align: center;

  .description {
    margin-top: 22px;
  }
`;
