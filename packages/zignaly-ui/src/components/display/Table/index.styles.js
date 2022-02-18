// Dependencies
import styled from 'styled-components';
import { styledIf } from '@utils/styled';

export const Layout = styled.table`
  border-spacing: 0;
  border-radius: 16px;
  background: #131225;
  overflow: hidden;
  width: 100%;
  
  font-family: 'Poppings', sans-serif;

  thead {
    user-select: none;
    border: 1px solid #222249;
    background: #222249;
    
    th {
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      color: #F3F4F6;
      padding: 16px 8px;
      white-space: nowrap;
      
      &:first-child {
        padding-left: 32px;
      }
      
      &:last-child {
        padding-right: 32px;
      }
    }
  }
  
  tbody {
    td {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: center;
      color: #F3F4F6;
      padding: 18px 16px;
    }
  }

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    border: 0;
    padding: 0 22px;
    border-bottom: 1px solid #222249;

    :last-child {
      border-right: 0;
    }
  }
`;

export const SortIcon = styled.img`
  margin-left: 6px;
  transition: all 0.1s linear;
  
  ${props => (`
     ${styledIf(props.isSortedDesc, `
      transform: rotate(180deg);
    `, `
      transform: rotate(0deg);
    `)}
  `)}
`;
