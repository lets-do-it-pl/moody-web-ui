const initialState = {
    categories: []
}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
            }

        case 'CREATE_CATEGORY':
            return {
            }

        case 'UPDATE_CATEGORY':
            return {
            }

        case 'DELETE_CATEGORY':
            return {
            }
            
        default:
            return state
    }
}
export default categoryReducer;