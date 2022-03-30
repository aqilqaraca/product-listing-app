import { Component } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Card from "./components/Card/Card";
class App extends Component {
  constructor() {
    super();
    this.state = {
      bagShow: false,
    };
  }
  render() {
    return (
      <>
        <Header onBagShow={(x)=>this.setState({bagShow : !x})}/>
        <div className="routes">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="card" element={<Card/>} />
          </Routes>
          {
            this.state.bagShow ? <div className="overlay"></div> : null
          }
        </div>
      </>
    );
  }
}

export default App;
