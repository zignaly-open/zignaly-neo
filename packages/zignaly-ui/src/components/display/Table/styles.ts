// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";

// Assets
import { ReactComponent as CheckIcon } from "assets/icons/check-icon.svg";
import { ReactComponent as CloseIcon } from "assets/icons/close-icon.svg";
import { ReactComponent as ArrowBottomIcon } from "assets/icons/arrow-bottom-icon.svg";

export const Layout = styled.div<{ maxWidth?: number }>`
  max-width: ${(props) => props.maxWidth}px;
`;

export const TextContainer = styled.div`
  padding: 4px 24px;
`;

export const IconContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  right: 4px;
`;

export const HeaderRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: inherit;
`;

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

export const TableView = styled.table<{ isUserTable: boolean; hasFooter?: boolean }>`
  border-spacing: 0;
  overflow: hidden;
  width: 100%;

  thead {
    background: rgba(19, 18, 37, 0.4);
    height: 56px;
    user-select: none;
    background: #06061a;
    box-shadow: 0 0 10px #16192b;
    border-radius: 0 0 5px 5px;
    position: relative;
    z-index: 0;
  }

  tbody {
    background: rgba(19, 18, 37, 0.4);

    td {
      letter-spacing: 0;
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

  tfoot {
    tr {
      &:first-child {
        height: 0;

        td {
          height: 0;
          border-top: 1px solid #252339;
          border-bottom: 0;
        }
      }
    }

    tr:last-child {
      td {
        padding: 10px 0;
        border-bottom: 0;
      }
    }
  }

  td {
    margin: 0;
    border: 0;
    border-bottom: 1px solid #252339;
    background: transparent;
    text-align: center;

    :last-child {
      border-right: 0;
    }

    ${(props) =>
      `${styledIf(
        props.isUserTable,
        `:first-child {
            border-right: 1px solid #252339;
          }`,
      )}
    `}
  }

  th {
    text-align: center;
  }

  tbody {
    tr {
      background: transparent;

      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }
`;

export const ThView = styled.th<{ isSorted?: boolean; isAlignRight?: boolean }>`
  color: #a9a9ba;
  white-space: nowrap;
  background: transparent;
  margin: 0;

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
  `}
`;

export const SortIcon = styled(ArrowBottomIcon)<{ isSorted?: boolean; isSortedDesc?: boolean }>`
  color: #f3f4f6;
  padding: 0;

  ${(props) => `
     ${styledIf(
       props.isSorted,
       `
        transition: all 0.1s linear;
        visibility: visible;
    `,
       `
        visibility: none;
        opacity: 0;
    `,
     )}
     ${styledIf(
       props.isSortedDesc,
       `
      transform: rotate(0deg);
    `,
       `
      transform: rotate(180deg); 
    `,
     )}
  `};
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
  padding: 5px 18px;
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
  }
`;
