import { Component } from "react";
import { globalContext } from "../../../context";


class ProductAttributes extends Component {
    static contextType = globalContext
    constructor() {
        super()
        this.state = {
            attrIndex: {},
        }
    }
    componentDidMount(){
        this.context.setGlobalAttr([])
    }
    render() {
        const { globalAttr, setGlobalAttr } = this.context
        const { attr } = this.props
        const attrId = this.props.attr.id
        const attrStyle = {
            color: "white",
            border: "none"
        }
        const setAttrtoContext = ()=>{
            setGlobalAttr([...globalAttr, this.state.attrIndex.id])
            this.props.setSelectedAttr({selectedAttr : this.state.attrIndex})
        }
        const setAttr = (item) => {
            this.setState({
                attrIndex: {
                    [attr.name]: item.id,
                    id: attrId,
                    value : item.value
                }
            }, () => setAttrtoContext())
        }
        return (
            <div className="product-details--attributes" key={attr.id}>
                <h4>{attr.name} : </h4>
                <ul>
                    {attr.items.map((item) => (
                        <li style={attrId === "Color" ? { backgroundColor: item.value, ...attrStyle } : null}
                            key={item.id}
                            className={
                                this.state.attrIndex[attrId] === item.id ? [attr.id === "Color" ? "active color" : "active"] : null
                            }
                            onClick={() => setAttr(item)}
                        >
                            {item.displayValue}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default ProductAttributes