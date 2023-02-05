import { TSignUpMutation } from "src/types/user";
import { axiosInstance } from "src/utils/axios";

export const signUp = (data: TSignUpMutation) => {
  return axiosInstance.post<TSignUpMutation>("/user", data);
};
