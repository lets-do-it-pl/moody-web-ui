import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const userService = {
    getUserDetails,
    updateUserDetails
};
async function getUserDetails(id) {

    return await apiService.asyncCallAuthorizedApi(HttpMethodType.GET, `/user/${id}`, {})
  }
  
  
async function updateUserDetails(id,fullName, email, userType ) {

    return await apiService.asyncCallAuthorizedApi(HttpMethodType.PUT, `/user/${id}`, {fullName,email,userType})
  }