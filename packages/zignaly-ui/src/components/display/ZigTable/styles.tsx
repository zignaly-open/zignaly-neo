import { ExpandMore } from "@mui/icons-material";
import { css, styled } from "@mui/system";
import { SortDirection } from "@tanstack/react-table";
import IconButton from "components/inputs/IconButton";

export const TableContainer = styled("div")`
  overflow: auto;
`;

export const Table = styled("table")`
  border-spacing: 0;
  width: 100%;
  border-radius: 16px;

  thead {
    height: 56px;
    user-select: none;
    background: #08081d;
    box-shadow: 0 0 10px #16192b;
  }

  th {
    color: ${({ theme }) => theme.palette.neutral200};
    white-space: nowrap;
    padding: 4px 10px;
  }

  td {
    color: ${({ theme }) => theme.palette.neutral100};
    padding: 12px 22px;
    white-space: nowrap;
    height: 95px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.neutral700};
    text-align: center;
  }

  tbody {
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }
`;

export const SortIcon = styled(ExpandMore, {
  shouldForwardProp: (prop) => prop !== "isSorted",
})<{ isSorted: false | SortDirection }>`
  transition: all 0.1s linear;

  ${({ isSorted }) =>
    !isSorted
      ? css`
          visibility: none;
          opacity: 0;
          margin-left: -24px;
        `
      : isSorted === "asc"
      ? css`
          transform: rotate(180deg);
        `
      : ``}
`;

export const PageNumberContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 41px;
  height: 36px;
  border-radius: 5px;
  background: ${({ theme }) => theme.palette.neutral750};
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.palette.neutral600};
`;

export const SmallSelectWrapper = styled("div")`
  min-width: 84px;

  .zig-react-select {
    &__control {
      min-height: 36px !important;
      padding: 0 !important;
    }
  }
`;

export const HeaderIconButton = styled(IconButton)`
  margin-left: -20px;
`;

export const SortBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "canSort",
})<{ canSort: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  ${({ canSort }) =>
    canSort &&
    css`
      cursor: pointer;
    `}
`;
