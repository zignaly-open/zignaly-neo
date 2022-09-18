import styled from 'styled-components';
import { Typography } from '@zignaly-open/ui';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Inline = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 22px;
`;

export const TypeText = styled(Typography).attrs({ variant: 'h4' })`
  display: flex;
  gap: 4px;
  span:nth-of-type(1) {
    color: ${({ theme }) => theme.neutral300};
  }

  span:nth-of-type(2) {
    color: ${({ theme }) => theme.neutral200};
  }
`;

export const List = styled.ul`
  user-select: none;
`;

export const Item = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background: #ffffff0a;
  }

  .internalName {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
