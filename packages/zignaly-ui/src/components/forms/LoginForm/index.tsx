// Dependencies
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Styled Components
import { Layout, Field, Form, Action } from "./styles";

// Components
import InputText from "../../inputs/InputText";
import Typography from "../../display/Typography";
import Button from "../../inputs/Button";
import TextButton from "../../inputs/TextButton";

// Types
import { LoginFormProps } from "./types";

// Validations
import { LoginValidation } from "../../../utils/validations";

function LoginForm({
  onSubmit,
  isLoading,
  signUpURL = null,
  forgotPasswordURL = null,
}: LoginFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(LoginValidation),
  });

  return (
    <Layout>
      <Typography variant={"h2"}>Log In</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputText
                label={"Email address:"}
                placeholder={""}
                value={field.value}
                onChange={field.onChange}
                error={errors.email?.message}
              />
            )}
          />
        </Field>
        <Field>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputText
                label={"Password:"}
                type={"password"}
                labelAction={
                  forgotPasswordURL
                    ? {
                        text: "Forgot password?",
                        href: forgotPasswordURL,
                      }
                    : null
                }
                value={field.value}
                placeholder={""}
                onChange={field.onChange}
                error={errors.password?.message}
              />
            )}
          />
        </Field>
        <Action>
          <Button
            type={"submit"}
            variant={"primary"}
            caption={"LOG IN"}
            size={"xlarge"}
            loading={isLoading}
          />
          {signUpURL && <TextButton href={signUpURL} caption={"Sign up"} />}
        </Action>
      </Form>
    </Layout>
  );
}

export default LoginForm;
