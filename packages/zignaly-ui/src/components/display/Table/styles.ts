// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";

export const Layout = styled.div``;

export const View = styled.div`
  width: 100%;
  border-radius: 16px;
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
  background: #131225;

  thead {
    border: 1px solid #222249;
    background: #222249;

    th {
      color: #f3f4f6;
      padding: 4px 22px;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      letter-spacing: 0.55px;
    }
  }

  tbody {
    td {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: center;
      color: #f3f4f6;
      padding: 12px 22px;
      white-space: nowrap;

      &.action {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }

  th,
  td {
    margin: 0;
    border: 0;
    border-bottom: 1px solid #222249;

    :last-child {
      border-right: 0;
    }
  }

  thead {
    user-select: none;

    th {
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      white-space: nowrap;
    }
  }

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
`;

export const SortIcon = styled.img<{ isSortedDesc?: boolean }>`
  margin-left: 6px;
  transition: all 0.1s linear;

  ${(props) => `
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
