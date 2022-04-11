import { createContext,useState } from "react";

export const globalContext = createContext()

const Context = ({children})=>{
    const [bagShow, setBagShow] = useState(false)
    const [currencyShow,setCurrencyShow] = useState(false)
    const [globalAttr,setGlobalAttr] = useState([])
    const values = {
        bagShow,
        setBagShow,
        currencyShow,
        setCurrencyShow,
        globalAttr,
        setGlobalAttr,
    }
    return (
        <globalContext.Provider value={values}>
            {children}
        </globalContext.Provider>
    )
}

export default Context;