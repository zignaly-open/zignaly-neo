// Dependencies
import styled from "styled-components";
import Typography from "../../display/Typography";

const getWidth = (width: "fullscreen" | "large" | "small" | number): number => {
  if (typeof width === "number") return width;

  switch (width) {
    case "large":
    default:
      return 824;
  }
};

export const Layout = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #101225;
  border: 1px solid #35334a;
  border-radius: 16px;

  ${({ width, padding }: any) => `
    width: ${getWidth(width)}px;
    padding: ${padding ?? "0"};
  `};
  user-select: none;
`;

export const Title = styled(Typography).attrs({
  variant: "h1",
  color: "neutral100",
  weight: "medium",
})`
  display: flex;
  justify-content: space-between;
`;

export const Body = styled.div`
  font-size: 14px;
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.neutral200};
  padding: 0px 56px 56px 56px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 14px;
  padding: 40px 40px 0px 56px;
`;

export const HeaderButton = styled.button<any>`
  border: 0;
  padding: 0;
  margin: 0;
  height: 32px;
  width: 32px;
  background: transparent;
  border: none;
  cursor: pointer;

  ${({ theme }) => `
    svg { 
      fill: ${theme.neutral300};
      width: 32px;
      height: 32px;
    }
  `}
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
