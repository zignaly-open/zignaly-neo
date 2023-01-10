import { InfoOutlined } from '@mui/icons-material';
import { Grid, styled, Switch } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { withAttrs } from 'util/styles';

export const TopPanel = styled(Grid)`
  background: #13122566;
  border-radius: 16px;
  margin: 21px 0 40px;
  flex: 1;
  padding: 40px 32px;
  justify-content: space-around;
`;

export const PanelItem = styled(Grid)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const StyledSwitch = styled(Switch)`
  .MuiSwitch-switchBase.Mui-checked {
    color: ${({ theme }) => theme.palette.greenGraph};
  }

  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: ${({ theme }) => theme.palette.greenGraph};
  }
`;

export const SubTitle = withAttrs(ZigTypography, {
  variant: 'subtitle1',
  fontWeight: 600,
  fontSize: 12,
  color: 'neutral300',
  mb: '20px',
  ml: '51px',
});

export const MinText = withAttrs(ZigTypography, {
  variant: 'h4',
  color: 'greenGraph',
  whiteSpace: 'nowrap',
});

export const PercText = withAttrs(ZigTypography, {
  variant: 'h3',
  color: 'greenGraph',
  component: 'span',
  fontWeight: 600,
  fontSize: 20,
});

export const SwitchLabel = styled(ZigTypography)`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.neutral200};
`;

export const TooltipIcon = styled(InfoOutlined)`
  width: 12px;
  height: 12px;
  color: #65647e;
  margin: 0 0 5px 4px;
`;

export const Separator = styled('div')`
  width: 1px;
  height: 128px;
  background: #222249;
  align-self: center;
`;
