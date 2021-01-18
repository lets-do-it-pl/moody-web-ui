import React, {useState} from 'react';
import * as Yup from 'yup';
import {Styles} from './common/Styles';
import { Formik, Form, Field } from 'formik';
import {Button, makeStyles, FormLabel} from '@material-ui/core';
import ImageUploader from "react-images-upload";
import {categoryService} from '../../_services/categoryService';

const ValidationSchema = Yup.object().shape({
    name : Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
});

const useStyles = makeStyles((theme) => ({
    submit: {
      backgroundColor: "#5cb85c",
      color : "white"
    },
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

const UpdateCategoryForm = ({...props}) => {
    const classes = useStyles();
    const [image, setImage] = useState(props.image);
    const [name, setName] = useState(props.name);

    const onDrop = async (file) => {
      const base64 = await convertBase64(file[0]);
      const base = base64.split(/[,]+/);
      setImage(base[1]);
    };

 return(
    <Styles>
        <Formik
            initialValues={{
                name : '',
            }}
            validationSchema={ValidationSchema}
            
            onSubmit={values => {
                values = {
                    Name : name,
                    Image : image
                }
                categoryService.updateCategory(props.id, values);
            }}
            >
            {({ errors, touched}) => (
                <Form>
                    <FormLabel >Category Name</FormLabel>
                    <Field name="name" value = {name} onChange={(e) => setName(e.target.value)}/>
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
                                imgExtension={[".jpg", ".gif", ".png"]}
                                maxFileSize={5242880}
                            />
                    <Button type="submit" className={classes.submit} variant="contained">Submit</Button>
                </Form>
            )}
        </Formik>
    </Styles>
    )
}

export default UpdateCategoryForm;