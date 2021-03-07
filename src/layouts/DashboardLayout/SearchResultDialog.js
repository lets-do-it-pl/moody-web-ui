import React from 'react';
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
import { Styles } from '../../views/category/common/Styles';
import { Formik } from 'formik';
import ImageUploader from "react-images-upload";
import { AlertType, StatusType } from 'src/_types';
import { categoryService } from '../../_services/category.service';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/styles';
import { showAlert } from 'src/_helpers';
import { confirmAlert } from 'react-confirm-alert';

const styles = () => ({
  update: {
    color: "orange"
  },
  details: {
    color: "purple"
  },
  table: {
    width: '100%',
  },
  delete: {
    color: "red"
  }
});
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

function SearchResultDialog(props) {
  const classes = useStyles();
  const {selectedOption, setSelectedOption} = props
  const setOpen = props.setOpenDialog
  const open = props.openDialog

  const onDrop = async (file) => {
    const base64 = await convertBase64(file[0]);
    const base = base64.split(/[,]+/);
    setSelectedOption((prev)=>{return {...prev, image:base[1]}});
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} fullWidth onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
        <DialogContent>
          <Styles>
            <Formik
              initialValues={{
                name: selectedOption.name,
                image: setSelectedOption.image
              }}
              validationSchema={ValidationSchema}

              onSubmit={async values => {
                values = {
                  name: selectedOption.name,
                  image: selectedOption.image
                }
                var result = await categoryService.updateCategory(selectedOption.id, values);
                setOpen(false);

                confirmAlert({
                  title: 'Confirm to Update',
                  message: 'Are you sure to update this category.',
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: async () => {
                          if (result.status === StatusType.Success) {
                          showAlert(props, "Category is updated.", AlertType.Success);
                          return;
                        }
            
                        showAlert(props, result.message, AlertType.Error);
                      }
                    },
                    {
                      label: 'No',
                      onClick: () => { }
                    }
                  ]
                });
                return;
              }}
            >
              {({ errors, touched, handleSubmit,values }) => (
                <form onSubmit={handleSubmit}>
                  <FormLabel >Category Name</FormLabel>
                  <TextField
                    name="name"
                    margin="normal"
                    type="name"
                    fullWidth
                    required
                    variant="outlined"
                    value={values.name}
                     />
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

export default withSnackbar(withStyles(styles)(SearchResultDialog));