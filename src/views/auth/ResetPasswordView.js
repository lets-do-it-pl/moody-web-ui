import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import { userService } from 'src/_services';
import { StatusType } from 'src/_types';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const ResetPasswordView = () => {
    const classes = useStyles();

    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    const getToken = () => {
        var queryString = window.location.search;

        if (queryString === undefined || queryString === "") {
            return undefined;
        }

        var qsItems = queryString.split("=");
        if (qsItems === undefined || qsItems.length !== 2) {
            return undefined;
        }

        return qsItems[1];
    }

    return (
        <Page
            className={classes.root}
            title="Reset Password"
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            password: '',
                            passwordConfirmation: ''
                        }}
                        validationSchema={
                            Yup.object().shape({
                                password: Yup.string().max(255).required('Password is required'),
                                passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
                            })
                        }
                        onSubmit={async (value) => {
                            var token = getToken();

                            var result = await userService.resetPassword(token, value.password);

                            if (result.status === StatusType.Success) {
                                setErrorMessage('');
                                setInfoMessage("Your new password has been set.");

                                return;
                            }

                            setErrorMessage(result.message);
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box mb={3}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h2"
                                    >
                                        Reset Password
                  </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Reset your password
                  </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(touched.password && errors.password)}
                                    fullWidth
                                    helperText={touched.password && errors.password}
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                                    fullWidth
                                    helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                                    label="Confirm Password"
                                    margin="normal"
                                    name="passwordConfirmation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="password"
                                    value={values.passwordConfirmation}
                                    variant="outlined"
                                />
                                {Boolean(touched.policy && errors.policy) && (
                                    <FormHelperText error>
                                        {errors.policy}
                                    </FormHelperText>
                                )}
                                <Typography
                                    color="error"
                                    variant="h5"
                                >
                                    {errorMessage}
                                </Typography>
                                <Typography
                                    color="primary"
                                    variant="h5"
                                >
                                    {infoMessage}
                                </Typography>
                                <Box my={2}>
                                    <Button
                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Reset Password
                  </Button>
                                </Box>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Have an account?
                  {' '}
                                    <Link
                                        component={RouterLink}
                                        to="/login"
                                        variant="h6"
                                    >
                                        Sign in
                  </Link>
                                </Typography>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </Page>
    );
};

export default ResetPasswordView;
