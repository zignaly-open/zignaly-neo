import { ReactComponent as CheckIcon } from "assets/icons/check-icon.svg";
import { ReactComponent as CloseIcon } from "assets/icons/close-icon.svg";
import { ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/system";

export const TextContainer = styled("div")`
  padding: 4px 24px;
`;

export const IconContainer = styled("div")`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  right: 4px;
`;

export const HeaderRow = styled("div")`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-left: 5px;
  padding-right: 5px;
  width: inherit;
`;

export const View = styled("div")`
  width: 100%;
  border-radius: 5px 5px 15px 15px;
  overflow: auto;
`;

export const TableView = styled("table")`
  border-spacing: 0;
  width: 100%;

  thead {
    height: 56px;
    user-select: none;
    background: #08081d;
    box-shadow: 0 0 10px #16192b;
  }

  tbody {
    background: #131225;

    td {
      color: ${({ theme }) => theme.palette.neutral100};
      padding: 12px 22px;
      white-space: nowrap;
      height: 95px;
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

export const ThView = styled("th")<{ isSorted?: boolean; isAlignRight?: boolean }>`
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

  ${(props) =>
    props.isSorted
      ? `
        border: 1px solid #35334A;
        border-radius: 5px;
    `
      : `
        border: 1px solid transparent;
    `}
`;

export const SortIcon = styled(ExpandMore)<{ isSorted?: boolean; isSortedDesc?: boolean }>`
  transition: all 0.1s linear;

  ${({ isSorted }) =>
    !isSorted &&
    `
        visibility: none;
        opacity: 0;
    `}

  ${({ isSortedDesc }) => !isSortedDesc && `transform: rotate(180deg); `}
`;

export const Actions = styled("div")``;

export const CheckIconStyled = styled(CheckIcon)`
  vertical-align: middle;
`;

export const CloseIconStyled = styled(CloseIcon)`
  vertical-align: middle;
`;

// export const EmptyMessage = styled(Typography).attrs({
//   variant: "body2",
//   color: "neutral400",
// })`
//   text-align: center;
//   display: flex;
//   padding: 36px;
//   align-items: center;
//   justify-content: center;
// `;

export const PageNumberContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 41px;
  height: 36px;
  border-radius: 5px;
  background: #101225;
  box-shadow: inset 0px 0px 0px 1px #35334a;
`;

// export const Row = styled.div<{ justifyContent: "end" | "start" | "center" }>`
//   display: flex;
//   flex: 3;
//   flex-direction: row;
//   align-items: center;
//   gap: 8px;
//   justify-content: ${(props) => props.justifyContent};
// `;

export const SelectorContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const SelectorSizing = styled("div")`
  height: 36px;
  width: 90px;
`;

export const FooterContainer = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 22px;
`;
