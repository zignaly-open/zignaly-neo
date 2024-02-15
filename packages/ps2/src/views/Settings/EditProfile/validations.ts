import { Node } from 'slate';
import * as yup from 'yup';
import { RichEditorElement } from '../../TraderService/components/EditServiceProfileContainer/types';

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
        function (val: RichEditorElement[]) {
          const bioText = val
            .map((n: Required<RichEditorElement>) => Node.string(n))
            .join('');
          return bioText.length <= 2000;
        },
      ),
  })
  .required();
