import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const categoryService = {
  getCategories,
  createCategory,
  updateCategory,
  updateOrder,
  deleteCategory,
  exportFile,
  removeCacheKey
};

async function getCategories() {
  return await apiService.asyncCallAuthorizedApi(
    HttpMethodType.GET,
    '/category/list'
  );
}

async function createCategory(data) {
  return await apiService.asyncCallAuthorizedApi(
    HttpMethodType.POST,
    '/category',
    data
  );
}

async function updateCategory(id, data) {
  return apiService.asyncCallAuthorizedApi(
    HttpMethodType.PUT,
    `/category/${id}`,
    data
  );
}

async function updateOrder(id, data) {
  return apiService.asyncCallAuthorizedApi(
    HttpMethodType.PUT,
    `/category/order/${id}`,
    data
  );
}

async function deleteCategory(id) {
  return apiService.asyncCallAuthorizedApi(
    HttpMethodType.DELETE,
    `/category/${id}`
  );
}

async function exportFile(type) {
  return await apiService.asyncCallAuthorizedApi(
    HttpMethodType.GET,
    `/category/export/${type}`,
    null,
    'blob'
  );
}

async function removeCacheKey() {
  return await apiService.asyncCallAuthorizedApi(
    HttpMethodType.GET,
    `/category/remove/cache`
  );
}
