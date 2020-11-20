import api from "./api";

export const ACTION_TYPES = {
    GET_CATEGORIES : 'GET_CATEGORIES',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    CREATE_CATEGORY: 'CREATE_CATEGORY'
}

export const getCategories = () => dispatch => {
    api.category().getCategories()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.GET_CATEGORIES,
                payload: response.data.categories
            })
        })
}

export const createCategory = (data) => dispatch => {
    api.category().createCategory(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE_CATEGORY,
                payload: response.data
            })
        })
}

export const updateCategory = (id, data) => dispatch => {
    api.category().updateCategory(id, data)
        .then(() => {
            dispatch({
                type: ACTION_TYPES.UPDATE_CATEGORY,
                payload: { id, ...data }
            })
        })
}

export const deleteCategory = (id) => dispatch => {
    api.category().deleteCategory(id)
        .then(() => {
            dispatch({
                type: ACTION_TYPES.DELETE_CATEGORY,
                payload: id
            })
        })
}