import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const dashboardService = {
    getDashboardWidgets
};

async function getDashboardWidgets() {
    return await apiService.asyncCallApi(HttpMethodType.GET, '/dashboard')
}