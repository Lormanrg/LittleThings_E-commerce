import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import {
  Card,
  Group,
  Badge,
  Button,
  Image,
  Text,
  Box,
  Flex,
  Title,
} from "@mantine/core";

export const Accesoriosdetails = () => {
  const { store, actions } = useContext(Context);
  const { postaccesorios } = store;
  const [accesorio, setAccesorio] = useState({});
  const params = useParams();

  const getAccesorio = () => {
    const accesorio = postaccesorios.find((post) => post.id == params.id);

    setAccesorio(accesorio);
  };

  useEffect(() => {
    getAccesorio();
  }, [postaccesorios]);

  return (
    <>
      {" "}
      <Box
        w={{ base: 200, sm: 400, lg: 500 }}
        py={{ base: "xs", sm: "md", lg: "xl" }}
        c="#fff"
        ta="center"
        mx="auto"
      >
        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Card.Section>
            <Image className="image" src={accesorio?.img_url} alt="Norway" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Title order={2} weight={400}>
              {accesorio?.name}
            </Title>
            <Flex justify="center" align="center">
              Cantidad disponible: {accesorio?.quantity}
              <Badge color="pink" variant="light" h={50} ml={10}>
                On Sale<br></br>
                {accesorio?.price}$
              </Badge>
            </Flex>
          </Group>

          <Text size="sm" color="dimmed">
            {accesorio?.details}
          </Text>
          <Flex>
            <Link to={`/accesorios`}>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Volver al menu "Accesorios"
              </Button>
            </Link>
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              mx={20}
            >
              Agregar al carrito
            </Button>
          </Flex>
        </Card>
      </Box>
    </>
  );
};
