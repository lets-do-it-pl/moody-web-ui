import { combineReducers } from "redux";
import  categoryReducer  from "./category";

const reducers = combineReducers({
    category : categoryReducer
})
export default reducers;
