import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Button, Flex, Container, Menu, Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/logo.jpg";
import "../../styles/content.css";
import { Activity } from "tabler-icons-react";

export const Navbar = () => {
  const { store, context } = useContext(Context);
  const location = useLocation();

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
        {location.pathname != "/" && (
          <Flex
            mih={50}
            bg="gray"
            gap="xs"
            justify="flex-end"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Link to="/register">
              <Button color="blue">Register</Button>
            </Link>
            <Link to="/login">
              <Button color="teal">Login</Button>
            </Link>
            <Menu trigger="hover" openDelay={100} closeDelay={400}>
              <Menu.Target>
                <Button>Marketplace</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Categorías</Menu.Label>
                <Link to="/t-shirts">
                  <Menu.Item icon={<i className="fas fa-tshirt"></i>}>
                    T-shirts
                  </Menu.Item>
                </Link>
                <Link to="/perfumes">
                  <Menu.Item icon={<Activity size={14} />}>Perfumes</Menu.Item>
                </Link>
                <Link to="/accesorios">
                  <Menu.Item icon={<Activity size={14} />}>
                    Accesorios
                  </Menu.Item>
                </Link>
              </Menu.Dropdown>
            </Menu>
            <Button color="gray">Carrito de compras</Button>
          </Flex>
        )}
      </Container>
    </>
  );
};
