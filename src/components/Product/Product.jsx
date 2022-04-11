import { Component } from "react";
import "./Product.scss";
import { connect } from "react-redux";
import bagWhite from "../../assets/images/bagWhite.svg"
import { Link } from "react-router-dom";
class Product extends Component {
  constructor() {
    super();
    this.state = {
      hoverProduct: false,
    };
  }
  render() {
    const { product, currency } = this.props;
    return (
      <Link to={`/product/${product.id}`} className="product">
        <div
          onMouseEnter={() => this.setState({ hoverProduct: true })}
          onMouseLeave={() => this.setState({ hoverProduct: false })}
        >
          <figure>
            <img className="product-main--image" src={product.gallery[0]} alt="product" />
            {!product.inStock ? (
              <div className="out-of-stock">OUT OF STOCK</div>
            ) : (
              [
                this.state.hoverProduct ? (
                  <div className="to-card">
                    <img src={bagWhite} alt="bag icon" />
                  </div>
                ) : null,
              ]
            )}
          </figure>
          <div className="product-content">
            <p>{product.brand} | {product.name}</p>
            <span>{currency.symbol}</span>
            {product.prices.filter(t => t.currency.label === currency.label).map((price, index) => (<span key={index}>{price.amount}</span>))}
          </div>
        </div>
      </Link>
    );
  }
}


function mapStateToProps(state) {
  const currency = state.currenciesReducer;
  return {
    currency,
  };
}

export default connect(mapStateToProps, null)(Product);
