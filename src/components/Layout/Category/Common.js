import { makeStyles } from '@material-ui/core/styles';

const convertBase64 = (image) => {
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
export default convertBase64;


const useStyles = makeStyles((theme) => ({
    submit: {
      backgroundColor: "#5cb85c",
      color : "white"
    },
  }));

