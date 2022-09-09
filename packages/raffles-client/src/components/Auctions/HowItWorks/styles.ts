import { styled } from '@mui/material';

export const ContainerBox = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto 17px;
  padding: 0 16px;
  max-width: 1200px;
  text-align: justify;
`;

export const HowItWorksList = styled('ul')`
  /* width: 100%; */
  display: flex;
  /* justify-content: space-evenly; */
  justify-content: space-between;
  padding-inline-start: 28px;

  > span {
    max-width: 46%;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-wrap: wrap;
    padding-inline-start: 11px;

    > span {
      max-width: 100%;
    }
  }
`;

export const BulletPointItem = styled('li')`
  &::marker {
    font-size: 30px;
  }
`;
