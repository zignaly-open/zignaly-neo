import { styled, Tab, Tabs } from '@mui/material';
import { PageContainer } from '@zignaly-open/ui';

export const Layout = styled(PageContainer)`
  padding: 120px 52px 0 52px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const StyledTab = styled(Tab)<{ active: boolean }>`
  position: relative;
  background-color: ${({ theme, active }) =>
    !active
      ? theme.palette.backgrounds.secondaryBackground
      : theme.palette.backgrounds.modal};
  border-radius: 5px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.palette.active : theme.palette.neutral600};
  padding: 19px 65px 17px 65px;
  z-index: ${({ active }) => (active ? 2 : 1)};
  margin-left: -10px;
  color: ${({ theme, active }) =>
    active ? theme.palette.highlighted : theme.palette.neutral400};
  .MuiTabs-indicator {
    visibility: hidden;
  }
`;
export const StyledTabs = styled(Tabs)`
  margin-left: -10px;
  .MuiTabs-flexContainer {
    margin-left: 10px;
  }
  .MuiTabs-indicator {
    display: none;
  }
`;
