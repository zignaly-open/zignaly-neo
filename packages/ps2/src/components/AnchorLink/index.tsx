import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const AnchorLink = styled(Link)`
  color: ${(props) => props.theme.palette.links};

  &:hover {
    text-decoration: underline;
  }
`;
export const ExternalLink = styled('a')`
  color: ${(props) => props.theme.palette.links};

  &:hover {
    text-decoration: underline;
  }
`;

ExternalLink.defaultProps = { target: '_blank' };

export default AnchorLink;
