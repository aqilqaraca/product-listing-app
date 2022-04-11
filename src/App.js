import { Component } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Card from "./components/Card/Card";
import { globalContext } from "./context";
class App extends Component {
  static contextType = globalContext
  render() {
    const {bagShow,setBagShow,setCurrencyShow} = this.context
    const hide = ()=>{
      setCurrencyShow(false)
      setBagShow(false)
    }
    return (
      <>
        <Header/>
        <div className="routes" onClick={hide}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="card" element={<Card/>} />
          </Routes>
          {
            bagShow ? <div className="overlay"></div> : null
          }
        </div>
      </>
    );
  }
}

export default App;
