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
    color: "white",
    marginBottom: '5px'
  },
  info : {
    fontSize: 16,
    fontFamily: 'BlinkMacSystemFont',
  },
  warning : {
    color: "#f44336"
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
      title="Refresh Category Version Cache"
    />
    <Divider />
    <CardContent>
      <Button
            variant = "contained"
            className = {classes.removeButton}
            onClick = {removeCache}>
          Refresh Version Cache
      </Button>
      <Divider/>
      <h3 className = {classes.info}> <h3 className = {classes.warning}>Info:</h3> This button removes the cache key so you can update the cached 
      version number to current version number. Normally we have to wait 24 hours in order to cache to refresh itself
       but by clicking you may refresh it without waiting that remaining time.</h3>
    </CardContent>
  </Card>
  )
}
export default withSnackbar(RemoveCache);