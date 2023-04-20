import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { Flex, Button, Container, Title } from "@mantine/core";
import { Navbar } from "../component/navbar.jsx";

import home from "../../styles/home.css";

import logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Container bg="gray">
        <Flex>

          <img className="logo" width="100px" height="100px" src={logo}></img>

        </Flex>
      </Container>
      <Container className="cover">
        <Flex bg="gray">
          <img className="logo" width="200px" height="200px" src={logo}></img>
        </Flex>
        <Flex bg="gray" className="title">
          <Title order={2} align="center" fs="italic">
            "Bienvenidos a nuestra tienda online donde encontraras los mejores
            disenos personalizados a tu gusto con el mejor factor precio calidad
            del mercado".{" "}
          </Title>
        </Flex>
        <Flex>
          <Link to="/menu">
            <Button order={1} align="center" fs="italic" className="button">
              "Presiona aqui para saber mas"
            </Button>
          </Link>
        </Flex>
      </Container>
    </>
  );
};
