import React, { useContext } from "react";
import ProductCard from "../component/ProductCard.jsx";
import { Container } from "tabler-icons-react";
import { Context } from "../store/appContext.js";

const Tshirts = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      {store.postperfumes.map((data) => {
        return <ProductCard key={data.id} product={data} />;
      })}
    </>
  );
};

export default Tshirts;
