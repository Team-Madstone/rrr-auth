import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "src/pages/Home";
import Login from "src/pages/Login";
import SignUp from "src/pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
