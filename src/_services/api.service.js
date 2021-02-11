import axios from 'axios';
import { authenticationService } from 'src/_services';
import { StatusType } from 'src/_types'

const apiUrl = process.env.REACT_APP_API_URL;

export const apiService = {
    asyncCallApi,
    asyncCallAuthorizedApi
};

async function asyncCallAuthorizedApi(
    httpMethodType,
    queryString,
    data) {

    var headers = {
        Authorization: `Bearer ${authenticationService.currentUserValue.token}`
    };

    return await asyncExecuteApiCall(httpMethodType, queryString, headers, data);
}

async function asyncCallApi(
    httpMethodType,
    queryString,
    data,
    token) {

  const headers = {};

  if (token !== undefined) {
        headers.Authorization = `Bearer ${token}`;
    }

    return await asyncExecuteApiCall(httpMethodType, queryString, headers, data);
}

async function asyncExecuteApiCall(
    httpMethodType,
    queryString,
    headers,
    data
) {
    try {
        const response = await axios({
            method: httpMethodType,
            url: `${apiUrl}${queryString}`,
            data: data,
            headers: headers
        });

        return {
            status: StatusType.Success,
            data: response.data
        };

    } catch (error) {

      if (!error.response) {
        return {
          status: StatusType.Fail,
          message: 'Error: Network Error'
        };
      }

      const response = error.response;

      if ([401, 403].indexOf(response.status) !== -1) {
            authenticationService.logout();

            return {
                status: StatusType.Fail,
                message: (response.data !== undefined && response.data !== "")
                    ? response.data : response.statusText
            };
        }

        if ([400, 499].indexOf(response.status) !== -1) {
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
