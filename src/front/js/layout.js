import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BackendURL } from "./component/backendURL";
import { MantineProvider } from "@mantine/core";
import { Home } from "./pages/home.jsx";
import { Menu } from "./pages/menu.jsx";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Menu />} path="/menu" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
};

export default injectContext(Layout);
