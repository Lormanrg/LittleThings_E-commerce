import React, { useContext } from "react";
import ProductCard from "../component/ProductCard.jsx";
import { Container } from "tabler-icons-react";
import { Context } from "../store/appContext.js";
import { Grid } from "@mantine/core";

const tshirts = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Grid justify="center" span={3}>
        {store.postshirts.map((data) => (
          <ProductCard key={data.id} product={data} />
        ))}
      </Grid>
    </>
  );
};

export default tshirts;
