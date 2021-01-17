import {ACTION_TYPES} from '../actions/categoryAction';

const initialState = {
    list: []
}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.GET_CATEGORIES:
            return {
                ...state,
                list : action.payload
            }

        case ACTION_TYPES.CREATE_CATEGORY:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE_CATEGORY:
            return {
                ...state,
                list: state.list.map(c => c.id === action.payload.id ? action.payload : c)
            }

        case ACTION_TYPES.DELETE_CATEGORY:
            return {
                ...state,
                list: state.list.filter(c => c.id !== action.payload)
            }
            
        default:
            return state
    }
}
export default categoryReducer;