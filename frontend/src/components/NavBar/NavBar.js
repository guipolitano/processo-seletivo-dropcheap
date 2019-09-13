import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Input,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import "./NavBar.scss";
const NavbarMenu = props => {
  const [showCartItems = false, toogleShow] = useState(0);
  const cart = props.cart.items;
  let items = "";
  if (cart) {
    items = cart.map((item, key) => (
      <ListGroupItem key={key}>
        <div>Name: {item.name}</div>
        <div>Amount: {item.qnt}</div>
        <div>Price: {item.price}</div>
        <button
          key={key}
          onClick={() => props.handleClickRemove(key)}
          className="btn btn-danger"
        >
          Remove Item
        </button>
      </ListGroupItem>
    ));
  }
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <b>
            <span className="color-medium">DROP</span>
            <span className="color-light">CHEAP</span>
          </b>
        </NavbarBrand>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => toogleShow(!showCartItems)}>
                <i className="fas fa-shopping-cart"> </i>
                <Badge color="light" pill>
                  {props.cart.qntTotal}
                </Badge>
              </NavLink>
            </NavItem>
            <NavItem>
              <Input className="search" placeholder="Search" />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div>
        <Modal isOpen={showCartItems}>
          <ModalHeader>Cart</ModalHeader>
          <ModalBody>
            <ListGroup>{items}</ListGroup>
          </ModalBody>
          <div className="col-sm-12">
            Total: ${" "}
            {props.cart.total !== null ? props.cart.total.toFixed(2) : ""}
          </div>
          <ModalFooter>
            <Button color="primary">Checkout</Button>{" "}
            <Button
              color="secondary"
              onClick={() => toogleShow(!showCartItems)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default NavbarMenu;
