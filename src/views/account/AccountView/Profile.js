import { accountService} from 'src/_services';
import ImageUploader from 'react-images-upload'
import {useSnackbar, withSnackbar} from 'notistack';
import { StatusType } from 'src/_types';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
   avatar: {
    height: 200,
    width: 200
  },
  ImageUploader :{
    marginTop : 2,
    marginBottom :2
  }
}));

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

function Profile (props) {
  const classes = useStyles();
  const [name, setUserName] = useState(props.account.fullName);
  const [email, setEmail] = useState(props.account.email);
  const [image, setImage] = useState(props.account.image);
  const { enqueueSnackbar } = useSnackbar();
  //console.log(props.account.email,image);

  const fileUploadHandler = async (file) =>{
    const base64 = await convertBase64(file[0]);
    const base = base64.split(/[,]+/);
    setImage(base[1]);
    uploadImage();
    
  }
  const uploadImage = async() => {
    var result = await accountService
    .updateAccount(
      name,
      email,
      image
      );

  if (result.status === StatusType.Success) {

   enqueueSnackbar("Updated Successfully", { variant: "success" });
    return;
  }
  enqueueSnackbar("Unable to Update!", { variant: "error" });
}

  return (
    
    <Card
      className={clsx(classes.root, name)}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={"data:image/png;base64," + image}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {name}
          </Typography>

        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        
        <ImageUploader
            {...props}
            id="image-upload"
            name="image"
            withLabel={false}
            withIcon ={false}
            singleImage={true}
            withPreview={false}
            buttonText= 'Upload Image'
            onChange= {fileUploadHandler}
            imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
            maxFileSize={5242880}
        ></ImageUploader>
      </CardActions>  
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default withSnackbar(Profile);
