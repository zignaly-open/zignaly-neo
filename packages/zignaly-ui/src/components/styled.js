// Dependencies
import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: grid;
  
  ${props => (`
    grid-template-columns: repeat(${props.children.length}, minmax(0%, 100%));
    gap: 8px;
  `)}
`;
