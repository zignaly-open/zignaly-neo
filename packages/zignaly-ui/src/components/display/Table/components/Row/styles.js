// Dependencies
import styled from 'styled-components';
import { styledIf } from '@utils/styled';

export const Expandable = styled.div``;

export const ExpandableIcon = styled.img`
  width: 12px;
  height: 12px;
  
  ${props => (`
     ${styledIf(props.isSortedDesc, `
      transform: rotate(180deg);
    `, `
      transform: rotate(0deg);
    `)}
  `)}
`;
