import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import {Styles} from './Styles';
import {connect} from "react-redux";
import { Formik, Form, Field } from 'formik';
import {Button, makeStyles, FormLabel} from '@material-ui/core';
import ImageUploader from "react-images-upload";
import * as actions from 'actions/categoryAction';
import convertBase64 from './Common';

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

const UpdateCategoryForm = ({...props}) => {
    const classes = useStyles();
    const [image, setImage] = useState(props.image);
    const [name, setName] = useState(props.name);

    const onDrop = async (file) => {
      const base64 = await convertBase64(file[0]);
      const base = base64.split(/[,]+/);
      setImage(base[1]);
    };

    useEffect(() => {
        props.getCategories();
    });

    const onHandleChange = (e) => {
        setName(e.target.value);
    }

 return(
    <Styles>
        <Formik
            initialValues={{
                name : '',
            }}
            validationSchema={ValidationSchema}
            
            onSubmit={values => {
                console.log(name, image);
                values = {
                    Name : name,
                    Image : image,
                    Order : props.order
                }
                props.updateCategory(props.id, values);
            }}
            >
            {({ errors, touched}) => (
                <Form>
                    <FormLabel >Category Name</FormLabel>
                    <Field name="name" value = {name} onChange={onHandleChange}/>
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

const mapStateToProps = state => ({
    entities : state.category.list
  });

const mapActionToProps = {
    updateCategory : actions.updateCategory,
    getCategories : actions.getCategories
}

export default connect(mapStateToProps, mapActionToProps)(UpdateCategoryForm);
