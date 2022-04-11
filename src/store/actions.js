export const SET_CATEGORIES_ACTION = "GET_CATEGORIES_ACTION"
export const SET_PRODUCTS = "SET_PRODUCTS"
export const SET_CURRENCIES = "SET_CURRENCIES"
export const SET_BAG = "SET_BAG"
export const SET_ITEM_COUNT = "SET_ITEM_COUNT"
export const SET_ITEM_COUNT_DEC = "SET_ITEM_COUNT_DEC"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const setCategoriesAction = (payload)=>{
    return {
        type : SET_CATEGORIES_ACTION,
        payload
    }
}

export const setProductsAction = (payload)=>{
    return {
        type : SET_PRODUCTS,
        payload
    }
}

export const setCurrenciesAction = (payload)=>{
    return {
        type : SET_CURRENCIES,
        payload
    }
}

export const setBagAction = (payload)=>{
    return {
        type : SET_BAG,
        payload
    }
}

export const setItemCountAction = (payload)=>{
    return { 
        type : SET_ITEM_COUNT,
        payload
    }
}

export const setItemCountActionDec = (payload)=>{
    return { 
        type : SET_ITEM_COUNT_DEC,
        payload
    }
}

export const deleteProductAction = (payload)=>{
    return {
        type:DELETE_PRODUCT,
        payload
    }
}

