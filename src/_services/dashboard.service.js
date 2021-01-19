import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const dashboardService = {
    getWidget
    
};

async function getWidget(){
return await apiService.asyncCallApi(HttpMethodType.GET, '/dashboard')
}