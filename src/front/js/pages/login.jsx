import React, { useContext } from "react";
import { Box, PasswordInput, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const { actions } = useContext(Context);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      username: (value) => (value.trim() !== "" ? null : "Invalid username"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleClick = async (values) => {
    let response = await actions.logIn(values);
    console.log(response);
    if (response) {
      navigate("/home");
    }
  };
  return (
    <>
      <Box mx="auto" className="register">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Nombre de usuario"
            {...form.getInputProps("username")}
          />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="Correo"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />

          <Group position="right" mt="md">
            <Button type="submit" onClick={() => handleClick()}>
              Ingresar
            </Button>
          </Group>
        </form>
      </Box>
    </>
  );
};
