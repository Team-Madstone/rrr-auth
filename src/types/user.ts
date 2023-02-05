export type TSignUpVariables = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type TSignUpMutation = TSignUpVariables & {
  callbackUrl: string;
};

export type TLoginVariables = {
  email: string;
  password: string;
};

export type TLogin = {
  accessToken: string;
};
