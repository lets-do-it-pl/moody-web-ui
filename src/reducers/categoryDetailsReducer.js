import {ACTION_TYPES} from '../actions/categoryDetailsAction';

const initialState = {
    list: []
}

const categoryDetailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.GET_CATEGORY_DETAILS:
            return {
                ...state,
                list : action.payload
            }

        case ACTION_TYPES.CREATE_CATEGORY_DETAIL:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE_CATEGORY_DETAIL:
            return {
                ...state,
                list: state.list.map(c => c.id === action.payload.id ? action.payload : c)
            }

        case ACTION_TYPES.DELETE_CATEGORY_DETAIL:
            return {
                ...state,
                list: state.list.filter(c => c.id !== action.payload)
            }
            
        default:
            return state
    }
}
export default categoryDetailsReducer;