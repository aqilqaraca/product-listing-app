import { Component } from 'react';
import "./Home.scss";
import { connect } from 'react-redux';
import { GET_PRODUCTS } from "../../Graphql/queries";
import { Query } from 'react-apollo';
import Product from '../Product/Product';
class Home extends Component {
    render() {
        return (
            <main>
                <div className="container">
                    <div className="products-wrap">
                        <h4>{this.props.categories}</h4>
                        <Query query={GET_PRODUCTS} variables={{ title: this.props.categories }}>
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
                                    return (
                                        <div className='products'>
                                            {
                                                data.category.products.map((product) => (
                                                    <Product key={product.id} product={{ ...product, count: 1 }} />
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            }}
                        </Query>
                    </div>
                </div>
            </main>
        )
    }
}


function mapStateToProps(state) {
    const { categories } = state.categoriesReducer
    return {
        categories
    }
}

export default connect(mapStateToProps)(Home)