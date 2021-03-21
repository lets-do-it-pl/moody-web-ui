import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  Box,
  FormLabel,
  Divider,
  makeStyles
} from '@material-ui/core';
import { Styles } from '../common/Styles';
import ImageUploader from "react-images-upload";
import { withSnackbar, useSnackbar } from 'notistack';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { StatusType } from 'src/_types';
import { categoryDetailsService } from '../../../_services/category.details.service';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%'
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

function CreateCategoryDetailsForm (props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = async (file) => {
    const base64 = await convertBase64(file[0]);
    const base = base64.split(/[,]+/);
    setImage(base[1]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    if(image === '')
    {
      enqueueSnackbar('Empty Image', {
        variant: 'error'
      });
    }
    else{
      const value = {
        Image: image
      }

      var result = await categoryDetailsService.createCategoryDetail(props.categoryId, value);
      setOpen(false);

      if (result.status === StatusType.Success) {
        enqueueSnackbar('Category is created.', {
          variant: 'success'
        });
        return;
      }

      enqueueSnackbar(result.message, { variant: 'error' });
    }
  }

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={handleClickOpen}
        startIcon={< AddIcon />}
      >
        Add Category Detail
      </Button>
      <Dialog 
        open={open} 
        fullWidth 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        >
        <Card>
          <CardHeader
            subheader="You can add a new category detail by this modal"
            title="New Category Detail"
          />
            <Divider />
            <Styles>
              <form onSubmit = {handleSubmit} className = {classes.form}>
                <CardContent className = {classes.form}>
                  <div>
                    <FormLabel>Category Detail Image</FormLabel>
                    <ImageUploader
                      {...props}
                      name="image"
                      withIcon={false}
                      onChange={onDrop}
                      buttonText="Upload"
                      withLabel={false}
                      singleImage={true}
                      withPreview={true}
                      imgExtension={[".jpg", ".gif", ".png", "jpeg"]}
                      maxFileSize={5242880}
                    />
                  </div>
                </CardContent>
                <Divider />
                <DialogActions>
                  <Box display="flex" justifyContent="flex-end" p={1}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={handleClose}
                      color="secondary"
                      size="small"
                      variant="contained"
                      className={classes.button}
                      startIcon={<CloseIcon />}
                    >
                      Cancel
                    </Button>
                  </Box>
                </DialogActions>
              </form>
            </Styles>
          </Card>
        </Dialog>
    </div>
  );
}

export default withSnackbar(CreateCategoryDetailsForm);