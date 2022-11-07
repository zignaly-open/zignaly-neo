import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const AnchorLink = styled(Link)`
  color: ${(props) => props.theme.palette.links};

  &:hover {
    text-decoration: underline;
  }
`;

export default AnchorLink;
