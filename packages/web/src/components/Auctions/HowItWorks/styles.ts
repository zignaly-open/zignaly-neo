import styled from '@emotion/styled';

export const HowItWorksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 44px 24px 44px;
  width: 45%;
  background: linear-gradient(
    91.23deg,
    rgba(34, 34, 73, 0.75) 0%,
    rgba(12, 13, 33, 0.75) 100%
  );
  backdrop-filter: blur(12px);
  border-radius: 12px;
  text-align: center;
  margin-bottom: 43px;
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const IconButtonContainer = styled.div`
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  margin-top: 16px;
  width: 100%;
`;
