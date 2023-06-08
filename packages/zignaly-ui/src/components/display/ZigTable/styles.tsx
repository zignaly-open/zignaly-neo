import { ExpandMore } from "@mui/icons-material";
import { Box, css, styled } from "@mui/system";
import { SortDirection } from "@tanstack/react-table";
import { IconButton } from "@mui/material";

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
      background: #13122566;

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

export const SmallSelectWrapper = styled("div")`
  min-width: 84px;

  .zig-react-select {
    &__control {
      min-height: 36px !important;
      margin-top: 0;
      margin-bottom: 0;
      padding: 0 !important;
    }
  }
`;

export const HeaderIconButton = styled(IconButton)`
  margin-left: -20px;
`;

export const HeaderBox = styled(Box)`
  min-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
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
