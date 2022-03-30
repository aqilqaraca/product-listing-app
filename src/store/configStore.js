import { combineReducers,createStore } from "redux";
import { categoriesReducer,productReducer,currenciesReducer,bagReducer } from "./reducers";
const rootReducer = combineReducers({
    categoriesReducer,
    productReducer,
    currenciesReducer,
    bagReducer
    
})

export const store = createStore(rootReducer)

