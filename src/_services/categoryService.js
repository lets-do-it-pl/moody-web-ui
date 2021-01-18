import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const categoryService = {
    listCategories,
    createCategory,
    updateCategory,
    updateOrder,
    deleteCategory
};

async function listCategories() {
    return await apiService.asyncCallApi(HttpMethodType.GET, '/category/list');
}

async function createCategory(data) {
    return await apiService.asyncCallApi(HttpMethodType.POST, '/category', data);
}

async function updateCategory( id, data) {
    return apiService.asyncCallApi(HttpMethodType.PUT, '/category/' + id, data);
}

async function updateOrder(id, previousId, nextId) {
    
    var data = {
        PreviousId: previousId,
        NextId: nextId 
    }

    return apiService.asyncCallApi(HttpMethodType.PUT, '/category/order/' + id, data);

}

async function deleteCategory(id) {
    return apiService.asyncCallApi(HttpMethodType.DELETE, '/category/' + id);
}