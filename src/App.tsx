import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "src/constants/routes";
import { UserProvider } from "src/contexts/userContext";
import Home from "src/pages/Home";
import Login from "src/pages/Login";
import SignUp from "src/pages/SignUp";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.Home} element={<Home />} />
            <Route path={routes.SignUp} element={<SignUp />} />
            <Route path={routes.Login} element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
