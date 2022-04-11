import React, { Component } from "react";
import "./ProductDetails.scss";
import { connect } from "react-redux";
import { setBagAction } from "../../store/actions";
import ProductAttributes from "./ProductAttributes/ProductAttributes";
import ProductImages from "./ProductImages/ProductImages";
import { GET_PRODUCT_BY_ID } from "../../Graphql/queries";
import { Query } from 'react-apollo';
import { useParams, Link } from "react-router-dom";
import { globalContext } from "../../context";
import Parser from 'html-react-parser'
class ProductDetails extends Component {
  static contextType = globalContext
  constructor() {
    super()
    this.state = {
      errorMessage: "",
      selectedAttr : null
    }
  }
  render() {
    const currency = this.props.currency;
    const productId = this.props.router.params.id
    const { globalAttr } = this.context
    const sendToCard = (data) => {
      let attrArray = []
      data.product.attributes.map(attr => {
        attrArray.push(attr.id)
      })
      let allFounded = attrArray.every(ai => globalAttr.includes(ai));
      if (allFounded) {
        this.props.setBagAction({ ...data.product, count: 1, pID: Date.now(), selectedAttr : this.state.selectedAttr })
        this.setState({ errorMessage: "" })
      }
      else {
        this.setState({ errorMessage: "* Select all features!" })
      }
    }
    return (
      <Query query={GET_PRODUCT_BY_ID} variables={{ id: productId }}>
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <span>Loading ...</span>
            )
          }
          else if (error) {
            return <span>Something went wrong</span>
          }
          else {
            if (data) {
              return (
                <main>
                  <section id="product-details">
                    <div className="container">
                      <Link to="/" className="to-all">{"<"} All products</Link>
                      <div className="product-details--content">
                        <ProductImages product={data.product} />
                        <div className="product-details--info">
                          <h5>{data.product.name}</h5>
                          <p>{data.product.brand}</p>
                          <div className="product-details--attr--wrapper">
                            {data.product.attributes.map((attr) => (
                              <ProductAttributes attr={attr} key={attr.id} setSelectedAttr={(set)=>this.setState(set)}/>
                            ))}
                          </div>
                          <div className="product-details--price">
                            <h4>price :</h4>
                            {data.product.prices.filter(t => t.currency.label === currency.label).map((price, index) => (
                              <h5 key={index}>
                                {price.currency.symbol}
                                {price.amount}
                              </h5>
                            ))}
                          </div>
                          <span className="errorMessage">{this.state.errorMessage}</span>
                          <button
                            disabled={!data.product.inStock}
                            onClick={() => sendToCard(data)}
                            className={
                              data.product.inStock ? "add-to-card" : "add-to-card out"
                            }
                          >
                            {data.product.inStock ? "add to card" : "out of stock"}
                          </button>
                          <div className="product-details--desc">{Parser(data.product.description)}</div>
                        </div>
                      </div>
                    </div>
                  </section>
                </main>
              )
            }
            else {
              return (
                <span>We can not find product !</span>
              )
            }
          }
        }}
      </Query>
    );
  }
}
function mapStateToProps(state) {
  const currency = state.currenciesReducer;
  const { categories } = state.categoriesReducer
  return {
    currency,
    categories
  };
}

const dispatchToProps = {
  setBagAction,
};


function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
export default connect(mapStateToProps, dispatchToProps)(withRouter(ProductDetails));


