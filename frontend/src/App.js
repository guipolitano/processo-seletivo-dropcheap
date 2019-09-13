import React, { Component } from "react";
import "./App.scss";
import NavBarMenu from "./components/NavBar/NavBar";
import Shop from "./components/Shop/Shop";
import { Container, Row, Col } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      load: false,
      cart: JSON.parse(localStorage.getItem("dropCheapCart")) || {
        items: [],
        total: null,
        qntTotal: null
      }
    };
  }
  handleClickBuy = key => {
    let total = this.state.cart.total;
    let cartItems = this.state.cart.items;
    let newItem = this.state.data.find((product, index) => index === key);
    let existedItem = cartItems.find(product => product.name === newItem.name);
    let qntTotal = this.state.cart.qntTotal;
    total += newItem.price;
    qntTotal += 1;
    if (existedItem) {
      newItem.qnt += 1;
      this.setState(
        {
          ...this.state,
          cart: { ...this.state.cart, total, qntTotal }
        },
        () =>
          localStorage.setItem("dropCheapCart", JSON.stringify(this.state.cart))
      );
    } else {
      newItem.qnt = 1;
      this.setState(
        {
          cart: { items: [...this.state.cart.items, newItem], total, qntTotal }
        },
        () =>
          localStorage.setItem("dropCheapCart", JSON.stringify(this.state.cart))
      );
    }
  };

  handleClickRemove = key => {
    let total = this.state.cart.total;
    let cartItems = this.state.cart.items;
    let removeItem = cartItems.find((product, index) => index === key);
    let existedItem = cartItems.find(
      product => product.name === removeItem.name
    );
    let qntTotal = this.state.cart.qntTotal;
    total -= removeItem.price;
    qntTotal -= 1;
    if (existedItem.qnt === 1) {
      let newItems = cartItems.filter(
        product => product.name !== removeItem.name
      );
      this.setState(
        {
          ...this.state,
          cart: { items: newItems, total, qntTotal }
        },
        () =>
          localStorage.setItem("dropCheapCart", JSON.stringify(this.state.cart))
      );
    } else {
      removeItem.qnt -= 1;

      this.setState(
        {
          cart: {
            items: [...this.state.cart.items],
            total,
            qntTotal
          }
        },
        () =>
          localStorage.setItem("dropCheapCart", JSON.stringify(this.state.cart))
      );
    }
  };
  componentDidMount() {
    fetch("http://127.0.0.1:3001/api/Products.php")
      .then(response => response.json())
      .then(data => this.setState({ data, load: true }));
  }
  render() {
    return (
      <div className="App">
        <NavBarMenu
          data={this.state.data}
          handleClickRemove={this.handleClickRemove}
          cart={this.state.cart}
        />
        <Container>
          <Row>
            <Col>
              <Shop
                load={this.state.load}
                data={this.state.data}
                handleClickBuy={this.handleClickBuy}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
