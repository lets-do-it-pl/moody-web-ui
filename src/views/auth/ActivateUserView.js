import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    makeStyles,
    Typography
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

const ActivateUserView = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [activatedText, setActivatedText] = useState(0);
    const [messageType, setMessageType] = useState('primary');
    const [constructorHasRun, setConstructorHasRun] = useState(false);

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

    const constructor = async () => {

        if (constructorHasRun) return;

        setConstructorHasRun(true);

        setActivatedText("Activating...");

        var token = getToken();

        if (token === undefined) {
            setMessageType('error');
            setActivatedText("Activation link is broken!");
            return;
        }

        var result = await userService.activateUser(token);

        if (result.status !== StatusType.Success) {
            setMessageType('error');
            setActivatedText(result.message);
            return;
        }

        setActivatedText("User is activated! You're being redirected to Login Page!");
        setTimeout(function () { navigate('/login', { replace: true }); }, 3000);
        return;
    }

    constructor();

    return (
        <Page
            className={classes.root}
            title="Activate User"        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"            >
                <Container maxWidth="sm">
                    <Typography
                        color={messageType}
                        variant="h1">
                        {activatedText}
                    </Typography>
                </Container>
            </Box>
        </Page>
    );
}

export default ActivateUserView;