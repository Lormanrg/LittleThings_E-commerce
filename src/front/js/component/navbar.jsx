import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Button, Flex, Container } from "@mantine/core";
import logo from "../../img/logo.jpg";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Container bg="gray" display="flex">
        <Flex>
          <img className="logo" width="100px" height="100px" src={logo}></img>
        </Flex>
        <Flex gap="lg" align="flex-start" justify="flex-end">
          <Button color="teal">Register</Button>
          <Button color="teal">Login</Button>
          <Button color="teal">Marketplace</Button>
          <Button color="gray">Carrito de compras</Button>
        </Flex>
      </Container>
    </>
  );
};
