// Dependencies
import styled from "styled-components";

export const Layout = styled.div`
  .input-box {
    background: #0f1124;

    input {
      background: #0f1124;
      border-color: #35334a !important;
      color: ${(props) => `${props.theme.neutral100}`};
      font-family: "Avenir Next", "Red Hat Text", sans-serif;
    }
  }
`;
