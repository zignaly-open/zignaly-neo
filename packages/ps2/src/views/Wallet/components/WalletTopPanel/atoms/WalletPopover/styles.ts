import { Popover } from '@mui/material';
import { styled } from '@mui/system';

export const StyledPopover = styled(Popover)`
  .MuiPopover-paper {
    background: #222249;
    border: 1px solid #413ba0;
    border-radius: 4px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 228px;
    color: #ffffff;
  }
`;
