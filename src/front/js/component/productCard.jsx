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
} from "@mantine/core";
import { Context } from "../store/appContext";

const ProductCard = (props) => {
  const { store, actions } = useContext(Context);
  console.log(props);
  return (
    <>
      <Card w="200px" shadow="sm" padding="lg" radius="lg" withBorder>
        <Card.Section>
          <Image src={props.product.img_url} alt="Norway" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={400}>Norway Fjord Adventures</Text>
          <Badge color="pink" variant="light">
            On Sale
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>

        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Ver mas
        </Button>
      </Card>
    </>
  );
};
export default ProductCard;
