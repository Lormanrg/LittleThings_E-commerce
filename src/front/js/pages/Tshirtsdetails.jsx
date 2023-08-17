import React, { useContext, useState, useEffect } from "react";
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
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Container } from "tabler-icons-react";

export const Tshirtsdetails = () => {
  const { store, actions } = useContext(Context);
  const { postshirts } = store;
  const [tshirt, setTshirt] = useState({});

  const params = useParams();

  const getTshirt = () => {
    const tshirt = postshirts.find((post) => post.id == params.id);
    setTshirt(tshirt);
  };

  useEffect(() => {
    getTshirt();
  }, [postshirts]);

  return (
    <>
      <Box
        w={{ base: 200, sm: 400, lg: 500 }}
        py={{ base: "xs", sm: "md", lg: "xl" }}
        c="#fff"
        ta="center"
        mx="auto"
      >
        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Card.Section>
            <Image className="image" src={tshirt?.img_url} alt="Norway" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={400}>{tshirt?.name}</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            {tshirt?.details}
          </Text>
          <Flex>
            <Link to={`/tshirts`}>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Volver al menu "T-shirts"
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
