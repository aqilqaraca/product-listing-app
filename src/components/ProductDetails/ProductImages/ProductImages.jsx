import { Component } from "react";

class ProductImages extends Component {
    constructor() {
        super()
        this.state = {
            imageIndex : null
        }
    }
    render() {
        const product = this.props.product
        return (
            <div className="product-details--images">
                <div className="product-details--images--small">
                    {product.gallery.map((item, index) => (
                        <figure
                            onClick={() => this.setState({ imageIndex: index })}
                            key={index}
                        >
                            <img src={item} alt={item.name} />
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
                            alt="product"
                        />
                    </figure>
                </div>
            </div>
        )
    }
}

export default ProductImages