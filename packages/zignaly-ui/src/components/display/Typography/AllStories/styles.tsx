import styled from "styled-components";

export const StoryList = styled.div`
  display: flex;
  flex-direction: row;
  * + * {
    margin-left: 10px;
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  * {
    margin-top: 8px;
  }
`;
