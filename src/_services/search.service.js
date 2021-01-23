import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const searchService = {
  generalSearch
};

async function generalSearch(searchKey) {
  return await apiService.asyncCallAuthorizedApi(HttpMethodType.GET, `/search?searchKey=${searchKey}`);
}
