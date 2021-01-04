import { authenticationService } from 'src/_services';
import { StatusType } from 'src/_helpers'

const apiUrl = process.env.REACT_APP_API_URL;

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

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                authenticationService.logout();
                window.location.reload(true);
            }

            return {
                status: StatusType.Fail,
                message: response ?? response.statusText
            };;
        }

        return {
            status: StatusType.Success,
            data: response.json()
        };

    } catch (error) {

        alert(error);
        // kirmizi alert cikacak.
        return {
            status: StatusType.Fail
        }
    }

}