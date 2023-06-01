import React, { useContext } from "react";
import { Box, PasswordInput, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

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
      navigate("/");
    }
  };
  return (
    <>
      <Box mx="auto" className="register">
        <form onSubmit={form.onSubmit((values) => handlesubmit(values))}>
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

          <Group position="right" mt="md">
            <Button type="submit">Ingresar</Button>
          </Group>
        </form>
      </Box>
    </>
  );
};
