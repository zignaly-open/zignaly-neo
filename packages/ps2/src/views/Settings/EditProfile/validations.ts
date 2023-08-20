import * as yup from 'yup';

export const EditProfileValidation = yup
  .object({
    username: yup.string(),
    bio: yup
      .string()
      .test(
        'maxlength',
        'common:validation.max-allowed-length',
        function (val) {
          return val.length <= 2000;
        },
      ),
  })
  .required();
