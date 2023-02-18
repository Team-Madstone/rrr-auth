import React, { ReactNode } from "react";
import Gnb from "src/components/Gnb";

type TProps = {
  children: ReactNode;
};

const Layout = ({ children }: TProps) => {
  return (
    <div>
      <Gnb />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
