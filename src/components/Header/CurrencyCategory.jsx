import { Component } from "react";
import { GET_CURRENCY_CATEGORY } from "../../Graphql/queries";
import { Query } from "react-apollo";
import {setCurrenciesAction} from "../../store/actions"
import {connect} from 'react-redux'
class CurrencyCategory extends Component {
  render() {
    return (
      <Query query={GET_CURRENCY_CATEGORY}>
        {({ data, loading }) =>
          loading ? (
            <span>Loading ...</span>
          ) : (
            <ul>
              {data.currencies.map((currency) => (
                <li onClick={()=>this.props.setCurrenciesAction(currency)}>
                  <span>{currency.symbol}</span>
                  <span>{currency.label}</span>
                </li>
              ))}
            </ul>
          )
        }
      </Query>
    );
  }
}

const dispatchToProps = {
    setCurrenciesAction
}

export default connect(null,dispatchToProps)(CurrencyCategory)
