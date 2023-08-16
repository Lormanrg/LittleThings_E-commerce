import React, { useContext } from "react";
import {
  Card,
  Link,
  Image,
  Group,
  Text,
  Badge,
  Button,
  Flex,
  Grid,
} from "@mantine/core";
import { Context } from "../store/appContext";

const ProductCard = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="lg" withBorder>
        <Card.Section>
          <Image className="image" src={props.product.img_url} alt="Norway" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={400}>{props.product.name}</Text>
          <Badge color="pink" variant="light">
            On Sale
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          {props.product.details}
        </Text>

        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Ver mas
        </Button>
      </Card>
    </>
  );
};
export default ProductCard;
