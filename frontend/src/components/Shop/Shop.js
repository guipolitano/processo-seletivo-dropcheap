import React from "react";
import { CardDeck } from "reactstrap";
import Product from "./Product";

const Shop = props => {
  if (props.load) {
    const data = props.data;
    const items = data.map((item, key) => (
      <Product
        click={props.handleClickBuy}
        key={key}
        id={key}
        name={item.name}
        price={item.price}
      />
    ));
    return <CardDeck>{items}</CardDeck>;
  }
  return <div></div>;
};

export default Shop;
