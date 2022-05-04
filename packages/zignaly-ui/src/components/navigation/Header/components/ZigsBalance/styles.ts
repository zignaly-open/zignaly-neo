// Dependencies
import styled from "styled-components";

// Assets
import WalletIcon from "assets/icons/wallet-icon.svg";

export const Layout = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 10px;
  user-select: none;

  background: rgba(16, 18, 37, 0.3);
  border: 1px solid #35334a;
  border-radius: 5px;
  padding: 6px 10px;
  height: 34px;
  align-items: center;
`;

export const StyledWalletIcon = styled(WalletIcon)`
  width: 18px;
  height: 18px;
`;

export const Balance = styled.span`
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.55px;
  color: #e1e9f0;
`;
