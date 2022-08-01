import * as yup from "yup";

export const LoginValidation = yup
  .object({
    email: yup.string().required("This field is required.").email("You must enter a email"),
    password: yup.string().required("This field is required."),
  })
  .required();
