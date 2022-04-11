import { Component } from "react";
import { connect } from "react-redux";
import "./Bag.scss";
import { setItemCountAction, setItemCountActionDec,deleteProductAction } from "../../../store/actions";
import { Link } from "react-router-dom";
import BagTotal from "./BagTotal";
class Bag extends Component {
  render() {
    const bag = this.props.bag;
    const currency = this.props.currency;
    const totalPrice = [];
    let itemsCount = 0
    bag.map((item) => {
      if (item) {
        item.prices.map((price) => {
          if (price.currency.label === currency.label) {
            totalPrice.push(price.amount * item.count);
            itemsCount += item.count
          }
        });
      }
    });
    const attrStyle = {
      width: "30px",
      height: "30px",
      display : "block"
    }
    const ItemDec = (item)=>{
      this.props.setItemCountActionDec(item.pID)
      if(item.count <=1){
        this.props.deleteProductAction(item)
      }
    }
    return (
      <div className="bag-container" style={bag.length > 3 ? { height: "80vh" } : null}>
        <h4>
          My bag, <span>{itemsCount} items</span>
        </h4>
        <ul>
          {bag.map((item) => (
            <li key={item.id}>
              <div className="bag-item--content">
                <p>{item.brand}</p>
                <p>{item.name}</p>
                {item.prices.map((price, index) => {
                  if (price.currency.label === currency.label) {
                    return (
                      <h5 key={index}>
                        {price.currency.symbol}
                        {price.amount}
                      </h5>
                    );
                  }
                })}
                <div style={{marginTop : "20px"}}>
                  {
                    item.selectedAttr.id === "Color" ? (<span className="bag-attr" style={{ backgroundColor: item.selectedAttr.value, ...attrStyle }}></span>) : (item.selectedAttr.id + " : " + item.selectedAttr.value)
                  }
                </div>
              </div>
              <div className="bag-item--part">
                <div className="bag-item--count">
                  <button
                    onClick={() => this.props.setItemCountAction(item.pID)}
                  >
                    +
                  </button>
                  <span>{item.count}</span>
                  <button
                    onClick={() => ItemDec(item)}
                  >
                    -
                  </button>
                </div>
                <div className="bag-item--image">
                  <img src={item.gallery[0]} alt="" />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {bag.length > 0 ? (
          <BagTotal totalPrice={totalPrice}/>
        ) : null}
        {bag.length > 0 ? (
          <div className="bag-buttons">
            <button className="view">View Bag</button>
            <button className="check"><Link to="/card">Check out</Link></button>
          </div>
        ) : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const bag = state.bagReducer;
  const currency = state.currenciesReducer;
  return {
    bag,
    currency,
  };
}

const dispatchToProps = {
  setItemCountAction,
  setItemCountActionDec,
  deleteProductAction
};
export default connect(mapStateToProps, dispatchToProps)(Bag);
