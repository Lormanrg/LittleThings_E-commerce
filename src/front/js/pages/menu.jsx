import React, { useContext } from "react";

import {
  BackgroundImage,
  Button,
  Container,
  Flex,
  Box,
  Image,
} from "@mantine/core";
import { Context } from "../store/appContext";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../component/navbar.jsx";
import "../../styles/menu.css";
import categories from "../component/categories.json";

export const Menu = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      {categories.item.map((data) => (
        <Container className="menu-cover" key={data.id}>
          <Flex
            className="div col-12  my-4 "
            mih={50}
            bg="rgb(222,222,222)"
            gap="lg"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
            display="flex"
          >
            <p className="text-center display-5 fs-1">
              {data.name} <br></br>{" "}
            </p>
            <img className="shirts" src={data.url_image}></img>
            <Link to={`${data.link}`}>
              <Button color="lime" className="button">
                Ver mas
              </Button>
            </Link>
          </Flex>
        </Container>
      ))}
    </>
  );
};
