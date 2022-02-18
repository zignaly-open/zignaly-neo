// Dependencies
import styled from 'styled-components';

export const Layout = styled.button`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background: rgba(12, 13, 33, 0.8);
  border: 1px dashed #4A4958;
  border-radius: 4px;
  color: #fff;
  
  padding: 8px 18px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  
  &[disabled] {
    cursor: default;
  }
`;

export const Icon = styled.img`
  margin-right: 12px;
`;

export const Caption = styled.span`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
`;
