// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";
import Typography from "../Typography";

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

export const ThView = styled.th<{ isSorted?: boolean, isAlignRight?: boolean }>`
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
  ${(props: any) => `
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

type OptionsMenuTypeProps = {
  disabled: boolean;
};

export const OptionsMenu = styled.ul<OptionsMenuTypeProps>`
  background: #202041;
  min-width: 290px;
  z-index: 5;

  &[disabled] {
    opacity: 0;
    right: -190px;
    visibility: hidden;
  }

  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  padding: 0;

  opacity: 1;
  visibility: visible;
  position: fixed;
  transition: all 0.1s linear;
  user-select: none;
`;

export const OptionHead = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #28284e;
  justify-content: space-between;
  align-items: center;
  padding: 8px 6px;
  margin: 0 12px;
`;

export const OptionTitle = styled.h4`
  padding: 0;
  margin: 0;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 300;
  color: #8d8db6;
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

export const InvestorLabel = styled(Typography)`
  text-align: center;
`;
