import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_CATEGORIES } from "../../Graphql/queries";
import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import BagIcon from "../../assets/images/BagIcon.svg";
import { connect } from "react-redux";
import { setCategoriesAction } from "../../store/actions";
import { Link } from "react-router-dom";
import CurrencyCategory from './CurrencyCategory/CurrencyCategory';
import Bag from './Bag/Bag'
import { globalContext } from "../../context";
import bottomArrow from "../../assets/images/bottomArrow.svg"
class Header extends Component {
  static contextType = globalContext
  constructor() {
    super();
    this.state = {
      categoryActiveIndex: 0,
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
    const { bagShow, setBagShow, currencyShow, setCurrencyShow } = this.context
    const onBagClick = () => {
      setBagShow(!bagShow)
      setCurrencyShow(false)
    }
    if(bagShow) {
      document.body.style.overflow = "hidden"
      document.body.style.height = "100vh"
      document.body.style.paddingRight = "15px"
    }
    else {
      document.body.style.overflow = "unset"
      document.body.style.height = "auto"
      document.body.style.paddingRight = "0"
    }
    let itemsCount = 0
    bags.map((item) => {
        itemsCount +=item.count
    });
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
                <img src={logo} alt="logo" />
              </figure>
            </Link>
          </div>
          <div className="bag-wrapper">
            <div
              className="price-category"
              onClick={() => {
                setCurrencyShow(!currencyShow)
                setBagShow(false)
              }
              }
            >
              <div>
                <span>{this.props.currency.symbol}</span>
                <img src={bottomArrow}/>
              </div>
              {currencyShow ? (
                <div className="currency-category">
                  <CurrencyCategory />
                </div>
              ) : null}
            </div>
            <div className="bag" >
              <figure onClick={onBagClick}>
                <img src={BagIcon} alt="bag icon" />
                {
                  itemsCount > 0 ? <div className="bag-items--length">{itemsCount}</div> : null
                }
              </figure>
              {
                bagShow ? <Bag /> : null
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
