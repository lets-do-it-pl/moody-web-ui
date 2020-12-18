import api from "./api";

export const ACTION_TYPES = {
    GET_CATEGORY_DEATILS : 'GET_CATEGORY_DETAILS',
    UPDATE_CATEGORY_DETAIL: 'UPDATE_CATEGORY_DETAIL',
    DELETE_CATEGORY_DETAIL: 'DELETE_CATEGORY_DETAIL',
    CREATE_CATEGORY_DETAIL: 'CREATE_CATEGORY_DETAIL'
}

export const getCategoryDetails = (categoryId) => dispatch => {
    api.categoryDetails().getCategoryDetails()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.GET_CATEGORY_DEATILS,
                payload: {categoryId, ...response.data.categoryDetails}
            })
        })
}

export const createCategoryDetail = (categoryId, data) => dispatch => {
    api.categoryDetails().createCategoryDetail(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE_CATEGORY_DETAIL,
                payload: response.data
            })
        })
}

export const updateCategoryDetail = (categoryId, detailsId, data) => dispatch => {
    api.categoryDetails().updateCategoryDetail(categoryId, detailsId, data)
        .then(() => {
            dispatch({
                type: ACTION_TYPES.UPDATE_CATEGORY_DETAIL,
                payload: { categoryId, detailsId, ...data }
            })
        })
}

export const deleteCategoryDetail = (categoryId, detailsId) => dispatch => {
    api.categoryDetails().deleteCategoryDetail(categoryId, detailsId)
        .then(() => {
            dispatch({
                type: ACTION_TYPES.DELETE_CATEGORY_DETAIL,
                payload: categoryId, detailsId
            })
        })
}