// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";

// Assets
import CheckIcon from "assets/icons/check-icon.svg";
import CloseIcon from "assets/icons/close-icon.svg";

export const Layout = styled.div``;

export const View = styled.div`
  width: 100%;
  border-radius: 5px 5px 15px 15px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 2px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    border: 2px solid transparent;
    background-clip: content-box;
    background: #131225;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2f2f66;

    &:hover {
      background: #363670;
    }
  }
`;

export const TableView = styled.table`
  border-spacing: 0;
  overflow: hidden;
  width: 100%;

  font-family: "Avenir", sans-serif;
  background: rgba(19, 18, 37, 0.4);
  thead {
    user-select: none;
    background: #06061a;
    box-shadow: 0 0 10px #16192b;
    border-radius: 0 0 5px 5px;
    position: relative;
    z-index: 0;
  }

  tbody {
    td {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0;
      text-align: center;
      color: #f3f4f6;
      padding: 12px 22px;
      white-space: nowrap;
      background: transparent;
      height: 95px;
      &.action {
        text-align: right;
      }
    }
  }

  td {
    margin: 0;
    border: 0;
    border-bottom: 1px solid #252339;
    background: transparent;
    img {
      vertical-align: initial;
    }
    :last-child {
      border-right: 0;
    }
  }

  tr {
    background: transparent;
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
`;

export const ThView = styled.th<{ isSorted?: boolean; isAlignRight?: boolean }>`
  color: #a9a9ba;
  padding: 4px 22px;
  white-space: nowrap;
  background: transparent;
  margin: 0;
  img {
    vertical-align: initial;
  }
  &:first-child {
    border-radius: 0 0 0 5px;
  }
  &:last-child {
    border-radius: 0 0 5px 0;
  }
  ${(props) => `
     ${styledIf(
       props.isSorted,
       `
        border: 1px solid #35334A;
        border-radius: 5px;
    `,
       `
        border: 1px solid transparent;
    `,
     )}
     ${styledIf(
       props.isAlignRight,
       `
        text-align: right;
    `,
       `
        text-align: center;
    `,
     )}
  `}
`;

export const SortIcon = styled.img<{ isSorted?: boolean; isSortedDesc?: boolean }>`
  margin-left: 6px;

  ${(props) => `
     ${styledIf(
       props.isSorted,
       `
        transition: all 0.1s linear;
        visibility: visible;;
    `,
       `
        visibility: hidden;
    `,
     )}
     ${styledIf(
       props.isSortedDesc,
       `
      transform: rotate(180deg);
    `,
       `
      transform: rotate(0deg);
    `,
     )}
  `}
`;

export const OptionList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 8px 0 0;
  overflow: auto;
  position: relative;
  height: 100%;

  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    border: 2px solid transparent;
    background-clip: content-box;
    background: #131225;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2f2f66;

    &:hover {
      background: #363670;
    }
  }
`;

export const OptionItem = styled.li`
  padding: 12px 18px;
`;

export const Actions = styled.div`
  button {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const CheckIconStyled = styled(CheckIcon)`
  vertical-align: middle;
`;

export const CloseIconStyled = styled(CloseIcon)`
  vertical-align: middle;
`;

export const ColumnsSelector = styled.div`
  padding: 20px 0 10px;
  color: ${(props) => props.theme.neutral200};

  > span {
    justify-content: center;
    display: flex;
    font-weight: 400;
  }
`;
