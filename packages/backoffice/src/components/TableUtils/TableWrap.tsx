import { Box, styled } from '@mui/system';

const TableWrap = styled(Box)`
  max-width: calc(100vw - 50px);
  width: 80%;
  & table {
    min-width: 1000px;
  }
`;

export default TableWrap;
