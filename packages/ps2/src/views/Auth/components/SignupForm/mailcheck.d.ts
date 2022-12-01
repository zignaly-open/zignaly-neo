declare module 'react-mailcheck' {
  import React from 'react';

  type MailcheckProps = {
    email: string;
  };
  const Mailcheck: React.FC<MailcheckProps>;
  export default Mailcheck;
}
