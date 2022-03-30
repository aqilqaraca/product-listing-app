import React, { Component } from "react";
import "./ProductDetails.scss";
import { connect } from "react-redux";
import { setBagAction } from "../../store/actions";
class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      imageIndex: null,
      attrIndex: null,
    };
  }
  render() {
    const product = this.props.product;
    const currency = this.props.currency;
    return (
      <main>
        <section id="product-details">
          <div className="container">
            <div className="product-details--content">
              <div className="product-details--images">
                <div className="product-details--images--small">
                  {product.gallery.map((item, index) => (
                    <figure
                      onClick={() => this.setState({ imageIndex: index })}
                    >
                      <img src={item} />
                    </figure>
                  ))}
                </div>
                <div className="product-details--images--big">
                  <figure>
                    <img
                      src={
                        this.state.imageIndex
                          ? product.gallery[this.state.imageIndex]
                          : product.gallery[0]
                      }
                    />
                  </figure>
                </div>
              </div>
              <div className="product-details--info">
                <h5>{product.name}</h5>
                <p>{product.brand}</p>
                <div className="product-details--attr--wrapper">
                  {product.attributes.map((attr) => (
                    <div className="product-details--attributes">
                      <h4>{attr.name} : </h4>
                      <ul>
                        {attr.items.map((item) => (
                          <li
                            key={item.id}
                            className={
                              this.state.attrIndex == item.id ? "active" : null
                            }
                            onClick={() =>
                              this.setState({ attrIndex: item.id })
                            }
                          >
                            {item.displayValue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="product-details--price">
                  <h4>price :</h4>
                  {product.prices.map((price) => {
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
                  <button
                    disabled={!product.inStock}
                    onClick={() => this.props.setBagAction(product)}
                    className={
                      product.inStock ? "add-to-card" : "add-to-card out"
                    }
                  >
                    {product.inStock ? "add to card" : "out of stock"}
                  </button>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
function mapStateToProps(state) {
  const product = state.productReducer;
  const currency = state.currenciesReducer;
  return {
    product,
    currency,
  };
}

const dispatchToProps = {
  setBagAction,
};
export default connect(mapStateToProps, dispatchToProps)(ProductDetails);
