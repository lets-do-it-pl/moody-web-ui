import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import {Styles} from './Styles';
import {connect} from "react-redux";
import {Formik, Form, Field} from 'formik';
import Button from '@material-ui/core/Button';
import ImageUploader from "react-images-upload";
import * as actions from 'actions/categoryAction';
import convertBase64 from './Common';
import { makeStyles } from '@material-ui/core/styles';

const ValidationSchema = Yup.object().shape({
    name : Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});

const useStyles = makeStyles((theme) => ({
    submit: {
      backgroundColor: "#5cb85c",
      color : "white"
    },
  }));

const CreateCategoryForm = ({...props}) =>  {
    const classes = useStyles();
    const [picture, setPicture] = useState();
    const [image, setImage] = useState();

    const onDrop = async (file) => {
      setPicture(file);
      const base64 = await convertBase64(file[0]);
      const base = base64.split(/[,]+/);
      setImage(base[1]);
    };

    useEffect(() => {
        props.getCategories();
    });

    return (
        <Styles>
            <Formik
                initialValues={{
                    name : '',
                }}
                validationSchema={ValidationSchema}

                onSubmit = {(values, {setSubmitting, resetForm}) => {
                    const orders = props.entities.map((entity) => (
                        entity.order
                    ));
                        if(props.entities !== null)
                        {
                            values = {
                                ...values,
                                Image : image,
                                Order : Math.min(...orders) - 1
                            }
                        }
                        else {
                            values = {
                                ...values,
                                Image : image,
                                Order : 100
                            }
                        }
                        props.createCategory(values);
                        resetForm({});
                        setSubmitting(false);
                }}>

                {({ errors, touched}) => (
                <Form>
                    <Field name="name" value = {props.name}/>
                    {touched.name && errors.name && <div>{errors.name}</div>}
                    <ImageUploader
                                {...props}
                                name = "Image"
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
  })

const mapActionToProps = {
    createCategory : actions.createCategory,
    getCategories : actions.getCategories
}

export default connect(mapStateToProps, mapActionToProps)(CreateCategoryForm);