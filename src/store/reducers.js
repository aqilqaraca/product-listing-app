import { SET_BAG, SET_CATEGORIES_ACTION,SET_CURRENCIES,SET_ITEM_COUNT,SET_ITEM_COUNT_DEC,SET_PRODUCTS } from "./actions";

const initialState = {
    categories : "all"
}

export const categoriesReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case SET_CATEGORIES_ACTION : 
            return {...state,categories : payload}
        default :
            return state
    }
}



export const productReducer = (state=[], {type,payload}) =>{
    switch(type){
        case SET_PRODUCTS : 
            return {...payload}
        default : 
            return state
    }
}

export const currenciesReducer = (state={ label : "USD", symbol : "$"}, {type,payload})=>{
    switch(type){
        case SET_CURRENCIES : 
            return {...state, label : payload.label , symbol : payload.symbol}
        default : 
            return state
    }
}

export const bagReducer = (state=[], {type,payload}) =>{
    switch(type){
        case SET_BAG :
            if(!state.includes(payload)){
                return [...state,payload]
            }
        case SET_ITEM_COUNT : 
            return state.map(item=>{
                if(item.id == payload){
                    return {...item, count : item.count +1}
                }
                else{
                    return item
                }
            })
        case SET_ITEM_COUNT_DEC : 
        return state.map(item=>{
            if(item.id == payload){
                if(item.count > 1){
                    return {...item, count : item.count  - 1 }
                }
                else{
                    return item
                }
            }
            else{
                return item
            }
        })
        default : 
            return state
    }
}