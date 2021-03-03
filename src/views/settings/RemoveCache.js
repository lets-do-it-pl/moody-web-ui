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
  removeButton : {
    backgroundColor: "#f44336",
    color: "white"
  }
}));


function RemoveCache() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const removeCache = async () => {
    confirmAlert({
      title: 'Confirm removing',
      message: 'Are you sure you want to remove the cache key?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            var result = await categoryService.removeCacheKey();

            if (result.status === StatusType.Success) {
                enqueueSnackbar('Cache Key has been successfully removed', {
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
      title="Remove Cache Key"
    />
    <Divider />
    <CardContent>
    <Button
          variant = "contained"
          className = {classes.removeButton}
          onClick = {removeCache}
        >
          Remove Cache Key
        </Button>
    </CardContent>
  </Card>
  )
}
export default withSnackbar(RemoveCache);