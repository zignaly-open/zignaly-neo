// Dependencies
import styled from 'styled-components';
import { styledIf } from '@utils/styled';

export const Layout = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 2px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    border: 2px solid transparent;
    background-clip: content-box;
    background: #131225;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2f2f66;
    
    &:hover {
      background: #363670;
    }
  }
`;

export const Table = styled.table`
  border-spacing: 0;
  overflow: hidden;
  width: 100%;
  font-family: 'Poppings', sans-serif;

  ${({ theme }) => (`
    background: ${theme.table.backgroundColor};
    
    thead {
      border: 1px solid ${theme.table.thead.borderColor};
      background: ${theme.table.thead.backgroundColor};
      
      th {
        color: ${theme.table.thead.th.textColor};
        padding: 12px 22px;
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
        color: ${theme.table.tbody.textColor};
        padding: 12px 22px;
        white-space: nowrap;
      }
    }
    
    th,
    td {
      margin: 0;
      border: 0;
      border-bottom: 1px solid ${theme.table.tbody.th.borderBottomColor};
  
      :last-child {
        border-right: 0;
      }
    }
  `)}

  thead {
    user-select: none;
    
    th {
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      white-space: nowrap;
    }
  }
  
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
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
