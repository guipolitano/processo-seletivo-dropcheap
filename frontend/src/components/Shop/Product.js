import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import "./Shop.scss";
import ImgPlaceHolder from "../../assets/images/product-image-placeholder.jpg";

const Product = props => {
  return (
    <Card>
      <CardImg top src={ImgPlaceHolder} alt="Card image cap" />
      <CardBody>
        <CardTitle>{props.name}</CardTitle>
        <CardSubtitle>Price: $ {props.price}</CardSubtitle>
        <Button onClick={() => props.click(props.id)} color="buy">
          {" "}
          Buy
        </Button>
      </CardBody>
    </Card>
  );
};

export default Product;
