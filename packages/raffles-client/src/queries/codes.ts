import { gql } from '@apollo/client';

export const CHECK_CODE = gql`
  query checkCode($code: String!) {
    checkCode(code: $code)
  }
`;
