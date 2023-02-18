import React, { createContext, ReactNode } from "react";
import { useMutation, useQuery } from "react-query";
import { getMyProfile, logout } from "src/services/user";
import { TUser } from "src/types/user";
import { axiosInstance } from "src/utils/axios";

type TProps = {
  user?: TUser;
  isLoading: boolean;
  logout: () => void;
  getUser: () => void;
};

export const UserContext = createContext<TProps>({
  user: undefined,
  isLoading: true,
  logout: () => {},
  getUser: () => {},
});

type TUserProvider = {
  children: ReactNode;
};

export const UserProvider = ({ children }: TUserProvider) => {
  const { data, isLoading, remove, refetch } = useQuery(
    "myProfile",
    getMyProfile
  );

  const { mutate: logoutMutation } = useMutation(logout, {
    onSuccess: () => {
      delete axiosInstance.defaults.headers.Authorization;
      remove();
      refetch();
    },
  });

  return (
    <UserContext.Provider
      value={{
        user: data?.data,
        isLoading,
        logout: logoutMutation,
        getUser: refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
