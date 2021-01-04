import axios from 'axios';
import { authenticationService } from 'src/_services';
import { StatusType } from 'src/_types'

const apiUrl = process.env.REACT_APP_API_URL;

export const apiService = {
    asyncCallApi
};

async function asyncCallApi(
    httpMethodType,
    queryString,
    data
) {

    try {
        const response = await axios({
            method: httpMethodType,
            url: `${apiUrl}${queryString}`,
            data: data
        });

        return {
            status: StatusType.Success,
            data: response.data
        };

    } catch (error) {

        var response = error.response;

        if ([401, 403].indexOf(response.status) !== -1) {
            authenticationService.logout();
            window.location.reload(true);

            return {
                status: StatusType.Fail,
                message: response.data ?? response.statusText
            };
        }

        if ([400, 500].indexOf(response.status) !== -1) {
            return {
                status: StatusType.Fail,
                message: response.data
            };
        }

        return {
            status: StatusType.Fail,
            message: `Unexpected Exception: ${error.message}`
        };
    }
}