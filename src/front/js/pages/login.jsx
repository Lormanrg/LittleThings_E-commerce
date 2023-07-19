import React, { useContext } from "react";
import {
  Box,
  PasswordInput,
  Button,
  Group,
  TextInput,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import user from "../../img/user.jpg";

export const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validate: {
      username: (value) => (value.trim() !== "" ? null : "Invalid username"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.trim() !== "" ? null : "Invalid password"),
    },
  });

  const handlesubmit = async (data) => {
    let response = await actions.logIn(data);
    console.log(response);
    if (response) {
      navigate("/menu");
    }
  };
  return (
    <>
      <Box mx="auto" className="login">
        <Flex className="img">
          <img src={user} className="user"></img>
        </Flex>
        <h1>Bienvenido</h1>

        <form onSubmit={form.onSubmit((values) => handlesubmit(values))}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Nombre de usuario"
            {...form.getInputProps("username")}
          />
          <h3>
            <i className="icon fas fa-envelope"></i>
          </h3>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Correo"
            {...form.getInputProps("email")}
          />
          <h3>
            <i className="icon fas fa-unlock"></i>
          </h3>
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />

          <Group position="center" mt="md">
            <Button type="submit">Ingresar</Button>
          </Group>
          <Group position="center" mt="md">
            <Button type="button">Registrar</Button>
          </Group>
        </form>
      </Box>
    </>
  );
};
