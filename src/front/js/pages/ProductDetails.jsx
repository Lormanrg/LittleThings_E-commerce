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
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Container } from "tabler-icons-react";

export const ProductDetails = () => {
  const { store, actions } = useContext(Context);
  const { postshirts, postperfumes, postaccesorios } = store;
  const [allproducts, setAllproducts] = useState({});

  const { type, id } = useParams();

  const getProduct = () => {
    let products =
      type == "tshirts"
        ? postshirts
        : type == "perfumes"
        ? postperfumes
        : type == "accesorios" && postaccesorios;
    const product = products.find((post) => post.id == id);
    setAllproducts(product);
  };

  useEffect(() => {
    getProduct();
  }, [allproducts]);

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
            <Image className="image" src={allproducts?.img_url} alt="Norway" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Title order={2} weight={400}>
              {allproducts?.name}
            </Title>
            <Flex justify="center" align="center">
              Cantidad disponible: {allproducts?.quantity}
              <Badge color="pink" variant="light" h={50} ml={10}>
                On Sale<br></br>
                {allproducts?.price}$
              </Badge>
            </Flex>
          </Group>

          <Text size="sm" color="dimmed">
            {allproducts?.details}
          </Text>
          <Flex>
            <Link to={`/${type}`}>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Volver al menu {type}
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
