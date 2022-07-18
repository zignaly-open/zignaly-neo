import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
`;

export const TextContainer = styled.div`
  text-align: center;
  margin-left: 5px;
`;
