import { styled } from '@mui/material';
import { ZigSelect, ZigTab, ZigTabs } from '@zignaly-open/ui';

export const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 88px;
  margin-top: 46px;
`;
export const StyledTab = styled(ZigTab)<{ active?: boolean }>`
  position: relative;
  background-color: ${({ theme, active }) =>
    active
      ? theme.palette.backgrounds.activeTab
      : theme.palette.backgrounds.modal};
  border-radius: 5px;
  border: 1px solid
    ${({ theme, active }) => !active && theme.palette.neutral600};
  padding: 19px 25px 17px 25px !important;
  font-weight: 500 !important;
  z-index: ${({ active }) => (active ? 2 : 1)};
  margin-left: -23px;
`;

export const StyledTabs = styled(ZigTabs)<{ md?: boolean }>`
  margin-left: -23px;
  justify-content: unset;
  gap: unset;
  .MuiTabs-flexContainer {
    margin-left: 45px;
  }
  .MuiTabs-indicator {
    display: none;
  }
  .Mui-selected {
    color: ${({ theme }) => theme.palette.highlighted} !important;
  }
`;

export const StyledZigSelect = styled(ZigSelect)`
  min-width: 210px;

  && {
    .zig-react-select {
      &__control {
        padding: 0;
        padding-right: 4px;
      }

      &__single-value {
        font-weight: 600;
        font-size: 11px;
        color: ${({ theme }) => theme.palette.neutral300} !important;
        letter-spacing: 1.1px;
      }
    }
  }
`;
