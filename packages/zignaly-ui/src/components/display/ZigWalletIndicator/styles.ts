import styled from "styled-components";

export const Layout = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 4px;
`;

export const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

export const RankIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 6px;
`;

export const Level = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #706f82;
`;

export const Token = styled.span`
  text-transform: uppercase;
  padding-left: 4px;
  line-height: 23px;
  color: #706f82;
`;

export const Value = styled.div`
  display: flex;
  text-transform: uppercase;
  color: #ffffff;
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
