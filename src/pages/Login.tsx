import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATE_MESSAGE } from "src/constants/message";
import { FORM_FIELD } from "src/constants/field";
import { TLoginVariables } from "src/types/user";
import { login as loginMutation } from "src/services/user";
import { routes } from "src/constants/routes";
import { AxiosError } from "axios";
import { TServerValidate } from "src/types/validate";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .required(VALIDATE_MESSAGE.Required(FORM_FIELD.Email))
    .email(VALIDATE_MESSAGE.Email),
  password: yup
    .string()
    .required(VALIDATE_MESSAGE.Required(FORM_FIELD.Password)),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TLoginVariables>({
    resolver: yupResolver(schema),
  });
  const navigator = useNavigate();

  const handleFormSubmit = async (data: TLoginVariables) => {
    try {
      const result = await loginMutation(data);
      // 로그인 저장 필요
      console.log(result.data.accessToken);
      navigator(routes.Home);
    } catch (error) {
      if (error instanceof AxiosError) {
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
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
