import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const categoryDetailsService = {
    listCategoryDetails,
    createCategoryDetail,
    updateCategoryDetail,
    updateOrder,
    deleteCategoryDetail
};

async function listCategoryDetails(categoryId) {
    return await apiService.asyncCallAuthorizedApi(HttpMethodType.GET, `/category/${categoryId}/details`);
}

async function createCategoryDetail(categoryId, data) {
    return await apiService.asyncCallAuthorizedApi(HttpMethodType.POST, `/category/${categoryId}/detail`, data);
}

async function updateCategoryDetail(categoryId, categoryDetailsId, data) {
    return apiService.asyncCallAuthorizedApi(HttpMethodType.PUT, `/category/${categoryId}/detail/${categoryDetailsId}`, data);
}

async function updateOrder(id, previousId, nextId) {

    var data = {
        PreviousId: previousId,
        NextId: nextId
    }

    return apiService.asyncCallAuthorizedApi(HttpMethodType.PUT, '/category/detail/order/' + id, data);

}

async function deleteCategoryDetail(categoryId, categoryDetailsId) {
    return apiService.asyncCallAuthorizedApi(HttpMethodType.DELETE, `/category/${categoryId}/detail/${categoryDetailsId}`);
}