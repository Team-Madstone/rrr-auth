import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "src/constants/routes";
import Home from "src/pages/Home";
import Login from "src/pages/Login";
import SignUp from "src/pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.Home} element={<Home />} />
        <Route path={routes.SignUp} element={<SignUp />} />
        <Route path={routes.Login} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
