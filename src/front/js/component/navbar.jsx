import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Button, Flex, Container, Menu, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../../img/logo.jpg";
import "../../styles/content.css";
import { Activity } from "tabler-icons-react";

export const Navbar = () => {
  const { store, context } = useContext(Context);

  return (
    <>
      {" "}
      <Container
        fluid="true"
        className="content"
        bg="gray"
        display="flex"
        justify="space-between"
      >
        <Link to="/">
          <Flex>
            <img className="logo" width="100px" height="100px" src={logo}></img>
          </Flex>
        </Link>
        <Flex
          mih={50}
          bg="gray"
          gap="xs"
          justify="flex-end"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button color="blue">Register</Button>
          <Button color="teal">Login</Button>
          <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button>Marketplace</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Categorías</Menu.Label>
              <Link to="/t-shirts">
                <Menu.Item icon={<Activity size={14} />}>T-shirts</Menu.Item>
              </Link>
              <Menu.Item icon={<Activity size={14} />}>Perfumes</Menu.Item>
              <Menu.Item icon={<Activity size={14} />}>Accesorios</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Button color="gray">Carrito de compras</Button>
        </Flex>
      </Container>
    </>
  );
};
