import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Home } from "./pages/home.jsx";
import { Menu } from "./pages/menu.jsx";
import { Navbar } from "./component/navbar.jsx";
import { Login } from "./pages/login.jsx";
import injectContext from "./store/appContext";
import Register from "./component/Register.jsx";
import Tshirts from "./pages/tshirts.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter basename={basename}>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Menu />} path="/menu" />
            <Route element={<Register />} path="/Register" />
            <Route element={<Login />} path="/login" />
            <Route element={<Tshirts />} path="/tshirts" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
};

export default injectContext(Layout);
