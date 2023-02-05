export type TSignUpVariables = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type TSignUpMutation = TSignUpVariables & {
  callbackUrl: string;
};
