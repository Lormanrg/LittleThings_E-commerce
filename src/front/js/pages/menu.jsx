import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar.jsx";

export const Menu = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Navbar />
    </>
  );
};
