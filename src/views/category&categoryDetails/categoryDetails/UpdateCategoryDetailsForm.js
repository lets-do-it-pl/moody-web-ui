import React, {useState} from 'react';
import {Button, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogTitle,
        FormLabel,
        makeStyles} from '@material-ui/core';
import {Styles} from '../common/Styles';
import {Formik, Form} from 'formik';
import ImageUploader from "react-images-upload";
import EditIcon from '@material-ui/icons/Edit';
import {categoryDetailsService} from '../../../_services/categoryDetailsService';

const useStyles = makeStyles(() => ({
    cancel: {
      backgroundColor: "#f44336",
      color : "white"
    },
    submit: {
      backgroundColor: "#5cb85c",
      color : "white"
    },
    edit: {
        color: "orange"
      }
  }));


function UpdateCategoryDetailsForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(props.image);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const onDrop = async (file) => {
    const base64 = await convertBase64(file[0]);
    const base = base64.split(/[,]+/);
    setImage(base[1]);
  };

  const onSubmit = () => {
       const value = {
            Image : image
        }
    categoryDetailsService.updateCategoryDetail(props.categoryId, props.id, value);
  }

  return (
    <div>
      <EditIcon onClick={handleClickOpen} className = {classes.edit}/>
      <Dialog open={open} fullWidth onClose={handleClose}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Category Detail</DialogTitle>
        <DialogContent>
            <div>
            <Styles>
            <Formik
                >
                    <Form>
                        <FormLabel >Category Detail Image</FormLabel>
                        <ImageUploader
                                    {...props}
                                    name = "image"
                                    withIcon={false}
                                    onChange={onDrop}
                                    buttonText="Upload"
                                    withLabel={false}
                                    singleImage={true}
                                    withPreview={true}
                                    imgExtension={[".jpg", ".gif", ".png"]}
                                    maxFileSize={5242880}
                                />
                        <Button onClick = {onSubmit} className={classes.submit} variant="contained">Submit</Button>
                    </Form>
            </Formik>
            </Styles>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className = {classes.cancel} variant = "contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateCategoryDetailsForm;