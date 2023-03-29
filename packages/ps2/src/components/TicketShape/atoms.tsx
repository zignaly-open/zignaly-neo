import { Box, styled } from '@mui/system';

// https://codepen.io/lrenhrda/pen/powRPN
const TicketShape = styled(Box)<{
  backgroundRgb: string;
  backgroundRgbHover?: string;
  hole: number;
}>`
  box-sizing: content-box;
  filter: drop-shadow(0 2px 5px rgba(pink, 0.5));
  position: relative;
  background-size: 51% 100%;
  background-repeat: no-repeat;
  background-image: radial-gradient(
      circle at 0 50%,
      rgba(${({ backgroundRgb }) => backgroundRgb}, 0) ${({ hole }) => hole}px,
      rgb(${({ backgroundRgb }) => backgroundRgb})
        ${({ hole }) => hole * 1.01}px
    ),
    radial-gradient(
      circle at 100% 50%,
      rgba(${({ backgroundRgb }) => backgroundRgb}, 0) ${({ hole }) => hole}px,
      rgb(${({ backgroundRgb }) => backgroundRgb})
        ${({ hole }) => hole * 1.01}px
    );
  &:hover {
    background-image: radial-gradient(
        circle at 0 50%,
        rgba(
            ${({ backgroundRgb, backgroundRgbHover }) =>
              backgroundRgbHover || backgroundRgb},
            0
          )
          ${({ hole }) => hole}px,
        rgb(
            ${({ backgroundRgb, backgroundRgbHover }) =>
              backgroundRgbHover || backgroundRgb}
          )
          ${({ hole }) => hole * 1.01}px
      ),
      radial-gradient(
        circle at 100% 50%,
        rgba(
            ${({ backgroundRgb, backgroundRgbHover }) =>
              backgroundRgbHover || backgroundRgb},
            0
          )
          ${({ hole }) => hole}px,
        rgb(
            ${({ backgroundRgb, backgroundRgbHover }) =>
              backgroundRgbHover || backgroundRgb}
          )
          ${({ hole }) => hole * 1.01}px
      );
  }
  background-position: top left, top right;
`;

export const TicketShapeIndependent = styled(TicketShape)`
  padding-left: ${({ hole }) => 2 * hole}px;
  padding-right: ${({ hole }) => 2 * hole}px;
`;

export default TicketShape;
