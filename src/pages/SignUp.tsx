import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATE_MESSAGE } from "src/constants/message";
import { STRING_MAX_LENGTH } from "src/constants/schema";
import { FORM_FIELD } from "src/constants/field";
import { TSignUpVariables } from "src/types/user";
import { signUp } from "src/services/user";
import { routes } from "src/constants/routes";
import { DOMAIN } from "src/constants/common";
import { isAxiosError } from "axios";
import { TServerValidate } from "src/types/validate";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Layout from "src/components/Layout";

const PASSWORD_MIN_LENGTH = 8;

const schema = yup.object({
  email: yup
    .string()
    .required(VALIDATE_MESSAGE.Required(FORM_FIELD.Email))
    .email(VALIDATE_MESSAGE.Email)
    .max(
      STRING_MAX_LENGTH,
      VALIDATE_MESSAGE.Max(FORM_FIELD.Email, STRING_MAX_LENGTH)
    ),
  password: yup
    .string()
    .required(VALIDATE_MESSAGE.Required(FORM_FIELD.Password))
    .min(
      PASSWORD_MIN_LENGTH,
      VALIDATE_MESSAGE.Min(FORM_FIELD.Password, PASSWORD_MIN_LENGTH)
    )
    .max(
      STRING_MAX_LENGTH,
      VALIDATE_MESSAGE.Max(FORM_FIELD.Password, STRING_MAX_LENGTH)
    ),
  confirmPassword: yup
    .string()
    .required(VALIDATE_MESSAGE.Required(FORM_FIELD.ConfirmPassword))
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TSignUpVariables>({
    resolver: yupResolver(schema),
  });
  const navigator = useNavigate();
  const { mutate: signUpMutation } = useMutation(signUp, {
    onSuccess: () => {
      navigator(routes.Login);
    },
    onError: (error) => {
      console.log(error);
      if (isAxiosError(error)) {
        error.response?.data.errors.forEach((err: TServerValidate) => {
          if (err.param === FORM_FIELD.Email) {
            setError(FORM_FIELD.Email, {
              message: err.msg,
            });
          }
          if (err.param === FORM_FIELD.Password) {
            setError(FORM_FIELD.Password, {
              message: err.msg,
            });
          }
        });
      }
    },
  });

  const handleFormSubmit = (data: TSignUpVariables) => {
    signUpMutation({
      ...data,
      callbackUrl: `${DOMAIN}${routes.VerifyEmail}`,
    });
  };

  return (
    <Layout>
      <h1>SignUp</h1>
      <div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <span>Email</span>
          </div>
          <input
            {...register(FORM_FIELD.Email)}
            placeholder="example@email.com"
          />
          <p>{errors.email?.message}</p>
          <div>
            <span>Password</span>
          </div>
          <input {...register(FORM_FIELD.Password)} type="password" />
          <p>{errors.password?.message}</p>
          <div>
            <span>Confirm Password</span>
          </div>
          <input {...register(FORM_FIELD.ConfirmPassword)} type="password" />
          <p>{errors.confirmPassword?.message}</p>
          <button type="submit">회원가입</button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
