import OptionUnstyled, {
  optionUnstyledClasses,
} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import { styled } from '@mui/system';

export const StyledButton = styled('button')`
  font-size: 11px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 180px;
  padding: 0 12px;
  border-radius: 5px;
  text-align: left;
  line-height: 1.5;
  cursor: pointer;
  background-color: #1012254d;
  outline: none;
  color: #89899a;
  font-weight: 600;
  border: 1px solid #35334a;
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: all 0.2s linear;

  &:hover {
    background: linear-gradient(289.8deg, #149cad29 0%, #4540c129 100%);
    color: #e1e9f0;
  }
  &:active {
    color: #e1e9f0;
    border: linear-gradient(#8671f7, #7ec9f9);
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
`;

export const StyledListbox = styled('ul')`
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 180px;
  border-radius: 4px;
  overflow: auto;
  outline: 0px;
  background: #12152c;
  box-shadow: #00000061 0px 4px 6px -2px;
`;

export const StyledOption = styled(OptionUnstyled)`
  list-style: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  color: #706f82;
  font-weight: 600;
  font-size: 14px;
  line-height: 28px;
  transition: all 0.2s linear;

  &:hover {
    color: #e1e9f0;
  }

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    color: #8671f7;
  }
`;

export const StyledOptionContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: fit-content;
  gap: 8px;
  align-items: center;
  margin: 0;
`;

export const StyledGroupRoot = styled('li')`
  list-style: none;
`;

export const StyledGroupHeader = styled('span')`
  display: block;
  padding: 15px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: $#e1e9f0;
`;

export const StyledGroupOptions = styled('ul')`
  list-style: none;
  margin-left: 0;
  padding: 0;

  > li {
    padding-left: 20px;
  }
`;

export const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

export const StyledImg = styled('img')`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;
