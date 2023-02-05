import { TLogin, TLoginVariables, TSignUpMutation } from "src/types/user";
import { axiosInstance } from "src/utils/axios";

export const signUp = (data: TSignUpMutation) => {
  return axiosInstance.post<TSignUpMutation>("/user", data);
};

export const login = (data: TLoginVariables) => {
  return axiosInstance.post<TLogin>("/user/login", data);
};
