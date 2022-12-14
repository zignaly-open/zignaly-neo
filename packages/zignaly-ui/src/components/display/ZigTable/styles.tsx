import { ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/system";
import { SortDirection } from "@tanstack/react-table";

export const Table = styled("table")`
  border-spacing: 0;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;

  thead {
    height: 56px;
    user-select: none;
    background: #08081d;
    box-shadow: 0 0 10px #16192b;
  }

  th {
    color: ${({ theme }) => theme.palette.neutral200};
    white-space: nowrap;
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
      ? `
      visibility: none;
      opacity: 0;`
      : isSorted === "asc"
      ? `
      transform: rotate(180deg);`
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
  .zig-react-select {
    &__control {
      min-height: 36px !important;
      padding: 0 !important;
    }
  }
`;

export const ThView = styled("th")<{ isSorted?: boolean; isAlignRight?: boolean }>`
  color: ${({ theme }) => theme.palette.neutral200};
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
