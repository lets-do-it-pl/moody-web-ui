import React, {useState} from 'react';
import {Button, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogTitle,
        makeStyles,
        FormLabel} from '@material-ui/core';
import * as Yup from 'yup';
import {Styles} from '../common/Styles';
import {Formik, Form, Field} from 'formik';
import ImageUploader from "react-images-upload";
import AddIcon from '@material-ui/icons/Add';
import {categoryService} from '../../../_services/categoryService';

const useStyles = makeStyles((theme) => ({
  cancel: {
    backgroundColor: "#f44336",
    color : "white"
  },
  submit: {
    backgroundColor: "#5cb85c",
    color : "white"
  },
  create: {
    color: "green"
  },
}));

const ValidationSchema = Yup.object().shape({
    name : Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});

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

function CreateCategoryForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState();

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
      <AddIcon onClick={handleClickOpen} className = {classes.create}/>
      <Dialog open={open} fullWidth onClose={handleClose}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a new Category</DialogTitle>
        <DialogContent>
            <div>
            <Styles>
            <Formik
                initialValues={{
                    name : '',
                }}
                validationSchema={ValidationSchema}

                onSubmit = {(values) => {

                        values = {
                            ...values,
                            Image : image
                        }
                        categoryService.createCategory(values);
                }}>

                {({ errors, touched}) => (
                <Form>
                    <FormLabel >Category Name</FormLabel>
                    <Field name="name" value = {props.name}/>
                    {touched.name && errors.name && <div>{errors.name}</div>}
                    <FormLabel >Category Image</FormLabel>
                    <ImageUploader
                                {...props}
                                name = "image"
                                withIcon={false}
                                onChange={onDrop}
                                buttonText="Upload"
                                withLabel={false}
                                singleImage={true}
                                withPreview={true}
                                imgExtension={[".jpg", ".gif", ".png", "jpeg"]}
                                maxFileSize={5242880}
                            />
                    <Button type="submit" className={classes.submit} variant="contained">Submit</Button>
                </Form>
                )}
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
export default CreateCategoryForm;