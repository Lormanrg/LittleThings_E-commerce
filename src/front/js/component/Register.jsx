import React, { useContext } from "react";
import { Context } from "../store/appContext";
import {
  Code,
  PasswordInput,
  TextInput,
  Group,
  Stepper,
  Button,
  Flex,
  Container,
  Menu,
  Text,
  Box,
  Checkbox,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "@mantine/form";

const Register = () => {
  const { actions } = useContext(Context);
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

  const handlesubmit = (values) => {
    actions.register(values);
  };

  return (
    <>
      <Title align="center" italic>
        Inicie su registro completando el siguiente formulario!
      </Title>
      <Box maw={400} mx="auto" mt="md">
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

          <TextInput
            withAsterisk
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </>
  );
};

export default Register;
