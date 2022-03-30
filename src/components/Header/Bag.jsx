import { Component } from "react";
import { connect } from "react-redux";
import "./Bag.scss";
import { setItemCountAction, setItemCountActionDec } from "../../store/actions";
import { Link } from "react-router-dom";
class Bag extends Component {
  render() {
    const bag = this.props.bag;
    const currency = this.props.currency;
    const totalPrice = [];
    const result = bag.map((item) => {
      item.prices.map((price) => {
        if (price.currency.label == currency.label) {
          totalPrice.push(price.amount * item.count);
        }
      });
    });
    return (
      <div className="bag-container">
        <h4>
          My bag, <span>{bag.length} items</span>
        </h4>
        <ul>
          {bag.map((item) => (
            <li>
              <div className="bag-item--content">
                <p>{item.name}</p>
                {item.prices.map((price) => {
                  if (price.currency.label == currency.label) {
                    return (
                      <h5>
                        {price.currency.symbol}
                        {price.amount}
                      </h5>
                    );
                  }
                })}
              </div>
              <div className="bag-item--part">
                <div className="bag-item--count">
                  <button
                    onClick={() => this.props.setItemCountAction(item.id)}
                  >
                    +
                  </button>
                  <span>{item.count}</span>
                  <button
                    onClick={() => this.props.setItemCountActionDec(item.id)}
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
          <div className="total">
            <h5>Total</h5>
            <h5>
              {Math.round(
                totalPrice.reduce(
                  (total, currentValue) => (total = total + currentValue),
                  0
                ) * 100
              ) / 100}
            </h5>
          </div>
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
};
export default connect(mapStateToProps, dispatchToProps)(Bag);
