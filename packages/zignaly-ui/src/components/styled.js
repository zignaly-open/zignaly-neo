// Dependencies
import styled from 'styled-components';

// Utils
import { styledIf } from '@utils/styled';

// Types
import { buttonVariantsId } from '@types/buttons';
import { sizeTypesId } from '@types/sizes';

export const ButtonGroup = styled.div`
  display: grid;
  
  ${props => (`
    grid-template-columns: repeat(${props.children.length}, minmax(0%, 100%));
    gap: 8px;
  `)}
`;

export const Button = styled.button`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  user-select: none;
  white-space: nowrap;

  &[disabled] {
    cursor: default;
  }
  
  ${props => `
    ${styledIf(props.size === sizeTypesId.SMALL, `
      padding: 8px 18px;
    `)}
  
    ${styledIf(props.variant === buttonVariantsId.PRIMARY, `
      background-color: red;
    `)}  
    
    ${styledIf(props.variant !== buttonVariantsId.PLACEHOLDER, `
      cursor: pointer;
    `)}
  `};
`;
