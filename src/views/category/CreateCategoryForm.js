import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  makeStyles,
  FormLabel,
  TextField,
  Card,
  Box,
  CardContent,
  CardHeader,
  Divider
} from '@material-ui/core';
import * as Yup from 'yup';
import { Styles } from './common/Styles';
import { Formik } from 'formik';
import { withSnackbar, useSnackbar } from 'notistack';
import ImageUploader from 'react-images-upload';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { StatusType } from 'src/_types';
import { categoryService } from '../../_services/category.service';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%'
  }
}));

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

const convertBase64 = image => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = error => {
      reject(error);
    };
  });
};

function CreateCategoryForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = async file => {
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
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Add Category
      </Button>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Card>
          <CardHeader
            subheader="You can add a new category by this modal"
            title="New Category"
          />
          <Divider />
          <Styles>
            <Formik
              initialValues={{
                name: '',
                description: ''
              }}
              validationSchema={ValidationSchema}
              onSubmit={async value => {
                value = {
                  Name: value.name,
                  Image: image,
                  Description: value.descripton
                };
                var result = await categoryService.createCategory(value);
                setOpen(false);

                if (result.status === StatusType.Success) {
                  enqueueSnackbar('Category is created.', {
                    variant: 'success'
                  });
                  return;
                }

                enqueueSnackbar(result.message, { variant: 'error' });
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                  <CardContent className={classes.form}>
                    <div>
                      <FormLabel>Category Image</FormLabel>
                      <ImageUploader
                        {...props}
                        name="image"
                        withIcon={false}
                        onChange={onDrop}
                        buttonText="Upload"
                        withLabel={false}
                        singleImage={true}
                        withPreview={true}
                        imgExtension={['.jpg', '.gif', '.png', 'jpeg']}
                        maxFileSize={5242880}
                      />
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        label="Name"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name="name"
                        value={values.name}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        helperText={touched.description && errors.description}
                        label="Description"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        name="description"
                        value={values.description}
                        variant="outlined"
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
              )}
            </Formik>
          </Styles>
        </Card>
      </Dialog>
    </div>
  );
}

export default withSnackbar(CreateCategoryForm);
