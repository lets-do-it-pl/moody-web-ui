import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Typography, Card, CardContent, CardHeader, Avatar, Grid } from '@material-ui/core';
import logo200Image from '../assets/img/logo/logo_200.png';
import loadjs from 'loadjs';
import SignInForm from '../components/SignInForm';
import ApiService from '../services/api.service';
import NotificationContainer from 'react-notifications';
import NotificationManager from 'react-notifications/lib/NotificationManager';

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

        if (values.recaptcha == false) {
            return;
        }

        var result = ApiService.authenticate(values.email, values.password);

        console.log(`Login ${result}`);
    }

    const values = {
        email: '',
        password: '',
        recaptcha: false,
    };

    const classes = useStyles();

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', marginTop: 8, marginBottom: 6 }}>
            <Grid item xs={2}>
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