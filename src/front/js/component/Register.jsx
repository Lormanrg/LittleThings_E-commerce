import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { TextInput, Group, Button, Box, Title } from "@mantine/core";
import "../../styles/register.css";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

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
      <Box mx="auto" className="register">
        <form onSubmit={form.onSubmit((values) => handlesubmit(values))}>
          <Title align="center" italic>
            Inicie su registro completando el siguiente formulario!
          </Title>
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
