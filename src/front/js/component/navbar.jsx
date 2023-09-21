import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Button, Flex, Container, Menu, Modal, Box } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../img/logo.jpg";
import { useDisclosure } from "@mantine/hooks";
import "../../styles/content.css";
import { Activity } from "tabler-icons-react";
import toast, { Toaster } from "react-hot-toast";

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
  }, [store.message, store.token]);

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
              </Modal>{" "}
              <Button color="gray" size="xl" onClick={open}>
                <div className="container-cart-icon dropdown">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="icon-cart"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <div className="count-products">
                    <span className="contador-productos">
                      {store.carts.length}
                    </span>
                  </div>
                </div>
              </Button>
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
