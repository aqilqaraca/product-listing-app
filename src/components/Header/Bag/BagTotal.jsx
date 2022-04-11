import React from 'react'
class BagTotal extends React.Component {
    render() {
        const totalPrice = this.props.totalPrice
        return (
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
        )
    }
}

export default BagTotal;