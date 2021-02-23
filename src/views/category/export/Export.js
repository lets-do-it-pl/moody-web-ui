  import React from 'react';
  import {
    Box,
    makeStyles,
    Button
  } from '@material-ui/core';
  import { StatusType } from 'src/_types';
  import { withSnackbar, useSnackbar } from 'notistack';
  import { categoryService } from '../../../_services/category.service';

  const useStyles = makeStyles((theme) => ({
    exportButton : {
      backgroundColor: "#00695f",
      marginRight: "10px",
      color: "white"
    }
  }));


 function Export() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const exportFile = async (type, e) => {
        var result = await categoryService.exportFile(type);

        if (result.status === StatusType.Success) {
            enqueueSnackbar('File has been successfully downloaded.', {
            variant: 'success'
            });
            return;
        }
      };

    return (
        <Box
        display="flex"
        justifyContent="flex-end"
        marginBottom="20px"
        pt="5px"
      >
        <Button
          className = {classes.exportButton}
          onClick = {exportFile.bind(this, "pdf")}
        >
          Export Pdf
        </Button>
        <Button
          className = {classes.exportButton}
          onClick = {exportFile.bind(this, "excel")}
        >
          Export Excel
        </Button>
      </Box>
    )
}
export default withSnackbar(Export);