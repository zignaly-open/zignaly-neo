// Dependencies
import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  max-width: 500px;
`;

export const Field = styled.div`
  border: 0;
  padding: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: 22px;
  width: 100%;
`;

export const Action = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 22px;
  margin: 26px 0;
  align-items: center;
  justify-content: center;
`;
