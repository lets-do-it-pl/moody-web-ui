import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Typography, Card, CardActions, CardContent, CardHeader, Avatar, Grid } from '@material-ui/core';
import { sizing, shadows } from '@material-ui/system';
import { Link } from 'react-router-dom';
import logo200Image from '../assets/img/logo/logo_200.png';
import loadjs from 'loadjs';
import SignInForm from '../components/SignInForm';
import Api from '../common/Api';
import { NotificationContainer } from 'react-notifications';

loadjs('https://www.google.com/recaptcha/api.js');

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(6),
        alignItems: 'center',
        maxWidth: 'sm',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(0, 0, 2),
    },
    large: {
        display: 'flex',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Required'),
    recaptcha: yup
        .bool()
        .oneOf([true], 'Please verify reCaptcha'),
});

const AuthPage = () => {

    function handleSubmit(values) {

        console.log("Loginnnn: " + values);
        // var result = Api.Login(values);

        // console.log(`Login ${result}`);
    }

    const values = {
        email: '',
        password: '',
        recaptcha: false,
    };

    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={3}>
            <Grid item xs={6}>
                <CssBaseline />
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar
                                alt="Moody"
                                src={logo200Image}
                                className="rounded"
                                style={{ width: 60, height: 60, cursor: 'pointer', marginBottom: 10, display: 'inline-block' }}
                            />
                        }
                        title={
                            <Typography component="h1" variant="h5">
                                Signin
                        </Typography>
                        }
                    />
                    <CardContent>
                        <Formik
                            render={props => <SignInForm classes={classes} {...props} />}
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            classes={useStyles()}
                        />
                        <NotificationContainer />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AuthPage;