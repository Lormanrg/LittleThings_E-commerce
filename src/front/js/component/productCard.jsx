import React, { useContext } from "react";
import {
  Card,
  Image,
  Group,
  Text,
  Badge,
  Button,
  Flex,
  Grid,
  Title,
} from "@mantine/core";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <>
      {!store.token ? (
        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Card.Section>
            <Image className="image" src={props.product.img_url} alt="Norway" />
          </Card.Section>
          <Group position="apart" mt="md" mb="xs">
            <Title weight={400}>{props.product.name}</Title>
            <Flex justify="center" align="center">
              Cantidad disponible: {props.product.quantity}
              <Badge
                color="pink"
                variant="light"
                h={50}
                ml={10}
                w={80}
                justify="center"
                align="center"
              >
                On Sale<br></br>
                {props.product.price}$
              </Badge>
            </Flex>
          </Group>
          <Text size="sm" color="dimmed">
            {props.product.details}
          </Text>
          <Link to={`/${props.type}/${props.product.id}`}>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Ver mas
            </Button>
          </Link>{" "}
        </Card>
      ) : (
        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Card.Section>
            <Image className="image" src={props.product.img_url} alt="Norway" />
          </Card.Section>
          <Group position="apart" mt="md" mb="xs">
            <Title weight={400}>{props.product.name}</Title>
            <Flex justify="center" align="center">
              Cantidad disponible: {props.product.quantity}
              <Badge
                color="pink"
                variant="light"
                h={50}
                ml={10}
                w={80}
                justify="center"
                align="center"
              >
                On Sale<br></br>
                {props.product.price}$
              </Badge>
            </Flex>
          </Group>
          <Text size="sm" color="dimmed">
            {props.product.details}
          </Text>
          <Link to={`/${props.type}/${props.product.id}`}>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Ver mas
            </Button>
          </Link>{" "}
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={() => {
              actions.addCart(props.product);
            }}
          >
            Agregar al carrito
          </Button>{" "}
        </Card>
      )}
    </>
  );
};
export default ProductCard;
