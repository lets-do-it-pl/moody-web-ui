import React from 'react';
import {
  makeStyles,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';
import { StatusType } from 'src/_types';
import { withSnackbar, useSnackbar } from 'notistack';
import { confirmAlert } from 'react-confirm-alert';
import { categoryService } from '../../_services/category.service';

const useStyles = makeStyles((theme) => ({
  disableButton : {
    backgroundColor: "#f44336",
    color: "white"
  }
}));


function DisableCache() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const removeCache = async () => {
    confirmAlert({
      title: 'Confirm disabling',
      message: 'Are you sure you want to disable the cache?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            var result = await categoryService.disableCache();

            if (result.status === StatusType.Success) {
                enqueueSnackbar('Cache has been successfully disabled', {
                variant: 'success'
                });
            return;
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <Card>
    <CardHeader
      title="Disable Cache"
    />
    <Divider />
    <CardContent>
    <Button
          variant = "contained"
          className = {classes.disableButton}
          onClick = {removeCache}
        >
          Disable Cache
        </Button>
    </CardContent>
  </Card>
  )
}
export default withSnackbar(DisableCache);