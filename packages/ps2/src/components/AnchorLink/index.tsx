import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AnchorLink = styled(Link)`
  color: ${(props) => props.theme.links};

  &:hover {
    text-decoration: underline;
  }
`;

export default AnchorLink;
