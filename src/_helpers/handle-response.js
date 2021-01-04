import { authenticationService } from 'src/_services';

export function handleResponse(response) {
    return response.text().then(text => {

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
            }

            const error = text ?? response.statusText;
            return {
                isSuccess: false,
                message: error
            };;
        }

        const data = text && JSON.parse(text);

        return { isSuccess: true, data };
    });
}