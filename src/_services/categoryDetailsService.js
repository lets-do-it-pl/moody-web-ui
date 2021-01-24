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
    return await apiService.asyncCallApi(HttpMethodType.GET, `/category/${categoryId}/details`);
}

async function createCategoryDetail(categoryId, data) {
    return await apiService.asyncCallApi(HttpMethodType.POST, `/category/${categoryId}/detail`, data);
}

async function updateCategoryDetail( categoryId, categoryDetailsId, data) {
    return apiService.asyncCallApi(HttpMethodType.PUT, `/category/${categoryId}/detail/${categoryDetailsId}`, data);
}

async function updateOrder(id, previousId, nextId) {
    
    var data = {
        PreviousId: previousId,
        NextId: nextId 
    }

    return apiService.asyncCallApi(HttpMethodType.PUT, '/category/order/' + id, data);

}

async function deleteCategoryDetail(categoryId, categoryDetailsId) {
    return apiService.asyncCallApi(HttpMethodType.DELETE, `/category/${categoryId}/detail/${categoryDetailsId}`);
}