import { styled } from '@mui/material';
import { PageContainer, ZigTab, ZigTabs } from '@zignaly-open/ui';

export const Layout = styled(PageContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledTab = styled(ZigTab)<{ active: boolean }>`
  position: relative;
  background-color: ${({ theme, active }) =>
    active
      ? theme.palette.backgrounds.activeTab
      : theme.palette.backgrounds.modal};
  border-radius: 5px;
  border: 1px solid
    ${({ theme, active }) => !active && theme.palette.neutral600};
  padding: 19px 65px 17px 65px !important;
  font-weight: 500 !important;
  z-index: ${({ active }) => (active ? 2 : 1)};
  margin-left: -30px;
`;

export const StyledTabs = styled(ZigTabs)`
  margin-left: -30px;
  justify-content: unset;
  gap: unset;
  .MuiTabs-flexContainer {
    margin-left: 45px;
  }
  .MuiTabs-indicator {
    display: none;
  }
`;
