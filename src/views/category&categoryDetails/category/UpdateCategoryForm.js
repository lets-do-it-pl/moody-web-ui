import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  FormLabel,
  TextField
} from '@material-ui/core';
import * as Yup from 'yup';
import { Styles } from '../common/Styles';
import { Formik } from 'formik';
import ImageUploader from "react-images-upload";
import EditIcon from '@material-ui/icons/Edit';
import { StatusType } from 'src/_types';
import { categoryService } from '../../../_services/categoryService';

const useStyles = makeStyles((theme) => ({
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

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
});

function UpdateCategoryForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(props.image);
  const [name, setName] = useState(props.name);

  const onDrop = async (file) => {
    const base64 = await convertBase64(file[0]);
    const base = base64.split(/[,]+/);
    setImage(base[1]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditIcon onClick={handleClickOpen} className={classes.edit} />
      <Dialog open={open} fullWidth onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
        <DialogContent>
          <Styles>
            <Formik
              initialValues={{
                name: '',
              }}
              validationSchema={ValidationSchema}

              onSubmit={async values => {
                values = {
                  Name: name,
                  Image: image
                }
                var result = await categoryService.updateCategory(props.id, values);
                setOpen(false);

                if (result.status === StatusType.Success) {
                  return;
                }

                this.state.error = result.message;
              }}
            >
              {({ errors, touched, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <FormLabel >Category Name</FormLabel>
                  <TextField
                    name="name"
                    margin="normal"
                    type="name"
                    fullWidth
                    required
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                  {touched.name && errors.name && <div>{errors.name}</div>}
                  <FormLabel >Category Image</FormLabel>
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
                    <Button type="submit" className={classes.submit} variant="contained">Submit</Button>
                    <Button onClick={handleClose} className={classes.cancel} variant="contained">
                      Cancel
                          </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Styles>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateCategoryForm;