import { Node, Element as SlateElement } from 'slate';
import * as yup from 'yup';

export const EditProfileValidation = yup
  .object({
    username: yup
      .string()
      .test(
        'maxlength',
        'common:validation.max-allowed-length',
        function (val) {
          return val.length <= 15;
        },
      ),
    bio: yup
      .array()
      .test(
        'maxlength',
        'common:validation.max-allowed-length',
        function (val: SlateElement[]) {
          const bioText = val.map((n: SlateElement) => Node.string(n)).join('');
          return bioText.length <= 2000;
        },
      ),
  })
  .required();
