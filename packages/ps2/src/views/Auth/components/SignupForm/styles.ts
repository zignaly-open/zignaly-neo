import { styled, Box } from '@mui/material';

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: 22px;
  width: 100%;
`;

export const Action = styled('div')`
  display: inline-flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
  justify-content: center;
`;

export const WrapperPlain = styled(Box)`
  width: 100%;
  padding: 32px 0 12px;
  max-width: 500px;
`;

export const Wrapper = styled(WrapperPlain)`
  padding: 12px 10px;
  background: linear-gradient(
    90deg,
    rgb(16 18 37) 0%,
    rgb(16 18 37) 35%,
    rgb(16 18 37) 100%
  );
  border: 1px solid #2a283a;
  border-radius: 5px;
`;
export const LineBox = styled(Box)`
  display: flex;
  height: 10px;
  width: 100%;
  border-radius: 4px;
  background: #b7bac7;
  border: 2px solid #150448;
  margin-bottom: 20px;
`;
export const ColouredLine = styled(Box)`
  flex: 3;
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(100.88deg, #3f3bb1 6.99%, #138ea0 93.63%);
`;
