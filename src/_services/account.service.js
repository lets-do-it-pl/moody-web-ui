import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const userService = {
    getAccount,
    updateAccountDetails
};
async function getAccount() {

    return await apiService.asyncCallAuthorizedApi(HttpMethodType.GET, `/account`, {})
  }
  
  
async function updateAccountDetails(fullName, email, image=null ) {

    return await apiService.asyncCallAuthorizedApi(HttpMethodType.PUT, `/account`, {fullName,email,image})
  }