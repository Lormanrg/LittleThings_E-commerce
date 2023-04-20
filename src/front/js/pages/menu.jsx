import React, { useContext } from "react";
import { Button, Container, Flex } from "@mantine/core";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar.jsx";
import "../../styles/menu.css";

export const Menu = () => {
  const { store, context } = useContext(Context);

  return (
    <>
      <Navbar />
      <Container className="menu-cover">
        <Flex
          className="menu-post-display one col-12  my-4 "
          mih={50}
          bg="rgb(222,222,222)"
          gap="md"
          justify="center"
          align="flex-center"
          direction="column"
          wrap="wrap"
        >
          <p className="text-center display-5 fs-1">
            T-shirts <br></br>
            <Link to="/t-shirts">
              <Button color="lime">Ver mas</Button>
            </Link>
          </p>
        </Flex>
        <Flex
          className="menu-post-display two col-12  my-4"
          mih={50}
          bg="rgb(222,222,222)"
          gap="md"
          justify="center"
          align="flex-center"
          direction="column"
          wrap="wrap"
        >
          <p className="text-center display-5 fs-1">
            Perfumes <br></br>
            <Link to="/perfumes">
              <Button color="lime">Ver mas</Button>
            </Link>
          </p>
        </Flex>
        <Flex
          className="menu-post-display three col-12  my-4"
          mih={50}
          bg="rgb(222,222,222)"
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <p className="text-center display-5 fs-1">
            Accesorios <br></br>
            <Link to="/accsesorios">
              <Button color="lime">Ver mas</Button>
            </Link>
          </p>
        </Flex>
      </Container>
    </>
  );
};
