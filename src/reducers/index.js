import { combineReducers } from "redux";
import  categoryReducer  from "./categoryReducer";
import categoryDetailsReducer from './categoryDetailsReducer';

export default combineReducers({
    category : categoryReducer,
    categoryDetail : categoryDetailsReducer
});
