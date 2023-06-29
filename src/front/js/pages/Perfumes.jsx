import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ProductCard from "../component/ProductCard.jsx";
import { Container } from "tabler-icons-react";
import { Grid, rem } from "@mantine/core";

const Perfumes = () => {
  const { store, actions } = useContext(Context);
  console.log(store.Perfumes);
  return (
    <>
      <Grid justify="center" span={3}>
        {store.postperfumes.map((data) => (
          <ProductCard key={data.id} product={data} />
        ))}
      </Grid>
    </>
  );
};

export default Perfumes;
