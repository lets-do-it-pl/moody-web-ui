export const ACTION_TYPES = {
    CONVERT_BASE64_TO_IMAGE : 'COVERT_BASE64_TO_IMAGE'
}

export const convertBase64 = (image) => dispatch => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}