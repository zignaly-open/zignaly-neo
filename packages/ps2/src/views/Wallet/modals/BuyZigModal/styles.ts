import { styled } from '@mui/system';

const ButtonsContainer = styled('div')`
  display: flex;
  justify-content: space-around;
  position: relative;
  margin-top: 18px;

  ${isMobile(`
    flex-direction: column;
    align-items: center;
  `)}
`;

const ButtonDesc = styled(Typography)`
  color: ${({ theme }) => theme.newTheme.secondaryText};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  text-align: center;
  justify-content: space-between;

  ${isMobile(css`
    width: 100%;
    align-items: center;

    &:last-child {
      margin-top: 14px;
    }

    button,
    a {
      width: 200px;
    }
  `)}

  p {
    margin-bottom: 10px;
    font-size: 15px;
  }
`;
