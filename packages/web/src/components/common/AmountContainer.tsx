import { styled } from '@mui/material/styles';

export const AmountContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #101225;
  box-shadow: inset 0px 0px 0px 1px #35334a;
  box-sizing: border-box;
  border-radius: 16px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    padding: 2px;
    background: none;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  &:before {
    background: linear-gradient(#8671f7, #7ec9f9);
  }
`;
