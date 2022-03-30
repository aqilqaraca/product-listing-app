import { Component } from "react";
import { connect } from "react-redux";
import "./Card.scss";
import { setItemCountAction, setItemCountActionDec } from "../../store/actions";
class Card extends Component {
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
      <main>
        <section id="card">
          <div className="container">
            <h4>Cart</h4>
            <div className="card-lists">
              <ul>
                {bag.map((item) => (
                  <li>
                    <div className="bag-item--content">
                      <p>{item.name}</p>
                      <h4>{item.brand}</h4>
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
                          onClick={() =>
                            this.props.setItemCountActionDec(item.id)
                          }
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
            </div>
          </div>
        </section>
      </main>
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
export default connect(mapStateToProps, dispatchToProps)(Card);
