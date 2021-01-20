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
    // bu kisma parametre olarak needUserToken ekleyebilirsiniz. 
    // burayi cagiran kisi true yaparsa asagidaki kod calisir.
) {

    //var headers = {};

//     if(token !== undefined)
// {
//     headers = { Authentication: `Bearer ${token}`}; // bu kod zaten var master'da

// }// once master'dan merge alin sonra yukaridaki parametereyi ve asagidaki kodu ekleyin
// // olur mu? Bir de cagirdiginiz yerde needUserToken'i tru yapmayi unutmayin olur mu?
// //Tamamdir. Takildiginiz yer olursa yazarsiniz abla. kolay gelsin

//     if(needUserToken === true){
//         var userToken = authenticationService.currentUser.Token;
//         headers = { Authentication: `Bearer ${userToken}`}; // bu kod zaten var master'da

//     }
// burayi dun aksam biraz daha degistim . bugun de merge ettim kodlari.
// o kodlari tekrar merge alabilir misiniz bu branche?Tamadir abi
//ayrica buraya bir parametre daha eklemeliyiz local storage'tan token';i alip gonderebilsin
//diye
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