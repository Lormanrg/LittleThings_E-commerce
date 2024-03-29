import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ProductCard from "../component/ProductCard.jsx";
import { Container } from "tabler-icons-react";
import { Flex, SimpleGrid, rem } from "@mantine/core";

const perfumes = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <SimpleGrid
        cols={6}
        spacing="lg"
        breakpoints={[
          { maxWidth: "md", cols: 3, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
        mt={20}
        px={20}
      >
        {store.postperfumes.map((data) => (
          <ProductCard key={data.id} product={data} type="perfumes" />
        ))}
      </SimpleGrid>
    </>
  );
};

export default perfumes;
