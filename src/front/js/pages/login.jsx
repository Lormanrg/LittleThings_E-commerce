import React from "react";
import { Box, PasswordInput, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export const Login = () => {
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
            <Button type="submit">Ingresar</Button>
          </Group>
        </form>
      </Box>
    </>
  );
};
