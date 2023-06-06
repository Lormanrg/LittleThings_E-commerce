import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { Flex, Button, Container, Title, Box } from "@mantine/core";

import home from "../../styles/home.css";

import logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        ></link>
      </head>
      <Box>
        <Container className="cover">
          <Flex bg="gray">
            <img className="logo" width="200px" height="200px" src={logo}></img>
          </Flex>

          <Flex bg="gray" className="title">
            <Title order={2} align="center" fs="italic">
              "Bienvenidos a nuestra tienda online donde encontraras los mejores
              disenos personalizados a tu gusto con el mejor factor precio
              calidad del mercado".{" "}
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
        <Flex className="footer">
          <Container className="container">
            <Flex direction="row" wrap="wrap">
              <Flex className="footer-col">
                <h4>Compania</h4>
                <ul>
                  <li>
                    <a href="">Sobre nosotros</a>
                  </li>
                  <li>
                    <a href="">Nuestros Servicios</a>
                  </li>
                  <li>
                    <a href="">Politicas de privacidad</a>
                  </li>
                  <li>
                    <a href="">Programa de afiliación</a>
                  </li>
                </ul>
              </Flex>
              <Flex className="footer-col">
                <h4>Get help</h4>
                <ul>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Comprando</a>
                  </li>
                  <li>
                    <a href="#">Reembolsos</a>
                  </li>
                  <li>
                    <a href="">Estatus de orden</a>
                  </li>
                  <li>
                    <a href="">Opciones de pago</a>
                  </li>
                </ul>
              </Flex>
              <Flex className="footer-col">
                <h4>Online Shop</h4>
                <ul>
                  <li>
                    <a href="">T-shirts</a>
                  </li>
                  <li>
                    <a href="">Perfumes</a>
                  </li>
                  <li>
                    <a href="">Accesorios</a>
                  </li>
                </ul>
              </Flex>
              <Flex className="footer-col">
                <h4>Follow us</h4>
                <Flex className="social-links">
                  <a href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Box>
    </>
  );
};
