import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  makeStyles
} from '@material-ui/core';
import { StatusType } from 'src/_types';
import { Styles } from '../common/Styles';
import { withSnackbar, useSnackbar } from 'notistack';
import ImageUploader from "react-images-upload";
import EditIcon from '@material-ui/icons/Edit';
import { categoryDetailsService } from '../../../_services/category.details.service';

const useStyles = makeStyles(() => ({
  cancel: {
    backgroundColor: "#f44336",
    color: "white"
  },
  submit: {
    backgroundColor: "#5cb85c",
    color: "white"
  },
  edit: {
    color: "orange"
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

function UpdateCategoryDetailsForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(props.image);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDrop = async (file) => {
    const base64 = await convertBase64(file[0]);
    const base = base64.split(/[,]+/);
    setImage(base[1]);
  };

  const handleSubmit = async () => {
    const value = {
      Image: image
    }

    var result = await categoryDetailsService.updateCategoryDetail(
      props.categoryId,
      props.id, value
    );
    setOpen(false);

    if (result.status === StatusType.Success) {
      enqueueSnackbar('Category detail has been successfully updated.', {
        variant: 'success'
      });
      return;
    }

    enqueueSnackbar(result.message, { variant: 'error' });
  }

  return (
    <div>
      <EditIcon onClick={handleClickOpen} className={classes.edit} />
      <Dialog 
        open={open} 
        fullWidth 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Category Detail</DialogTitle>
        <DialogContent>
          <Styles>
              <form onSubmit = {handleSubmit}>
                <FormLabel >Category Detail Image</FormLabel>
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
                <DialogActions>
                  <Button
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={handleClose}
                    className={classes.cancel}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>
          </Styles>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withSnackbar(UpdateCategoryDetailsForm);