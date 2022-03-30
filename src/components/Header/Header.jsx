import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_CATEGORIES } from "../../Graphql/queries";
import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import bag from "../../assets/images/bag.svg";
import { connect } from "react-redux";
import { setCategoriesAction } from "../../store/actions";
import { Link } from "react-router-dom";
import CurrencyCategory from './CurrencyCategory'
import Bag from './Bag'
class Header extends Component {
  constructor() {
    super();
    this.state = {
      categoryActiveIndex: 0,
      currencyShow: false,
      bagShow : false
    };
    this.clickCategory = (index, categoryName) => {
      this.setState({
        categoryActiveIndex: index,
      });
      this.props.setCategoriesAction(categoryName);
    };
  }
  render() {
    const bags = this.props.bag
    const onBagClick = ()=>{
        this.setState({bagShow : !this.state.bagShow})
        this.props.onBagShow(this.state.bagShow)
        if(!this.state.bagShow){
          document.body.style.overflow = "hidden"
          document.body.style.height = "100vh"
          document.body.style.paddingRight = "15px"
        }
        else{
          document.body.style.overflow = "unset"
          document.body.style.height = "auto"
          document.body.style.paddingRight = "0"
        }
    }
    return (
      <header>
        <div className="container">
          <Query query={GET_CATEGORIES}>
            {({ data, loading, error }) => {
              if (loading) {
                return <span>Loading ...</span>;
              } else if (error) {
                return (
                  <span>Something went wrong!</span>
                );
              } else {
                return (
                  <ul className="category-list">
                    {data.categories.map((category, index) => (
                      <li
                        onClick={() => this.clickCategory(index, category.name)}
                        className={
                          index === this.state.categoryActiveIndex
                            ? "category-list--item active"
                            : "category-list--item"
                        }
                        key={index}
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                );
              }
            }}
          </Query>
          <div className="logo">
            <Link to="/">
              <figure>
                <img src={logo} alt="" />
              </figure>
            </Link>
          </div>
          <div className="bag-wrapper">
            <div
              className="price-category"
              onClick={() =>
                this.setState({ currencyShow: !this.state.currencyShow })
              }
            >
              <div>
              <span>{this.props.currency.symbol}</span>
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.5L4 3.5L7 0.5"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              </div>
              {this.state.currencyShow ? (
                <div className="currency-category">
                   <CurrencyCategory/>
                </div>
              ) : null}
            </div>
            <div className="bag" >
              <figure onClick={onBagClick}>
                <img src={bag} />
                {
                  bags.length > 0 ? <div className="bag-items--length">{bags.length}</div> : null 
                }
              </figure>
              {
                this.state.bagShow ? <Bag/> : null
              }
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const dispatchToProps = {
  setCategoriesAction,
};

function mapStateToProps(state) {
  const bag = state.bagReducer;
  const currency = state.currenciesReducer
  return {
    bag,
    currency
  };
}

export default connect(mapStateToProps, dispatchToProps)(Header);
