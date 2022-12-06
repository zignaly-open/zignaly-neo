import { css, styled } from '@mui/material';

export const AmountContainer = styled('div')<{
  coloredBorder?: boolean;
}>`
  position: relative;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #101225;
  box-shadow: inset 0px 0px 0px 1px #35334a;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 8px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    padding: 2px;
    background: none;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  ${({ coloredBorder }) =>
    coloredBorder &&
    css`
      &:before {
        background: linear-gradient(#8671f7, #7ec9f9);
      }
    `}
`;
