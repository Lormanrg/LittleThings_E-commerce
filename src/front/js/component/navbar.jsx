import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import {
  Button,
  Flex,
  Container,
  Menu,
  Text,
  Image,
  Modal,
  Group,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../img/logo.jpg";
import perfume from "../../img/perfume-svgrepo-com.svg";
import "../../styles/content.css";
import { Activity } from "tabler-icons-react";
import toast, { Toaster } from "react-hot-toast";
import { useDisclosure } from "@mantine/hooks";

export const Navbar = () => {
  const { store, context, actions } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (store.message.text === "") return;
    if (store.message.type) {
      toast.success(store.message.text);
    } else {
      toast.error(store.message.text);
    }
  }, [store.message]);

  const handleLogout = () => {
    let response = actions.logOut();
    if (response) {
      navigate("/menu");
    }
  };
  // const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Toaster />
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
        {!store.token && location.pathname != "/" ? (
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
                <Link to="/tshirts">
                  <Menu.Item icon={<i className="fas fa-tshirt"></i>}>
                    T-shirts
                  </Menu.Item>
                </Link>
                <Link to="/perfumes">
                  <Menu.Item icon={<i className="fa-solid fa-wine-bottle"></i>}>
                    Perfumes
                  </Menu.Item>
                </Link>
                <Link to="/accesorios">
                  <Menu.Item icon={<Activity size={14} />}>
                    Accesorios
                  </Menu.Item>
                </Link>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        ) : (
          store.token &&
          location.pathname != "/" && (
            <Flex
              mih={50}
              bg="gray"
              gap="xs"
              justify="flex-end"
              align="center"
              direction="row"
              wrap="wrap"
            >
              {" "}
              <Modal opened={opened} onClose={close} withCloseButton={false}>
                Modal without header, press escape or click on overlay to close
              </Modal>
              <Group position="center">
                <Button onClick={open} color="gray">
                  Carrito de compras
                </Button>
              </Group>
              <Button color="red" onClick={() => handleLogout()}>
                LogOut
              </Button>
            </Flex>
          )
        )}
      </Container>
    </>
  );
};
