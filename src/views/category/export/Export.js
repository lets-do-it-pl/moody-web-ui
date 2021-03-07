  import React from 'react';
  import {
    Box,
    makeStyles,
    Button
  } from '@material-ui/core';
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

    const exportFile = async (type, extension, e) => {
        await categoryService.exportFile(type)
              .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Categories${new Date().toLocaleString()}.${extension}`);
                document.body.appendChild(link);
                link.click();
              });
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
          onClick = {exportFile.bind(this, "pdf", 'pdf')}
        >
          Export Pdf
        </Button>
        <Button
          className = {classes.exportButton}
          onClick = {exportFile.bind(this, "excel", 'xlsx')}
        >
          Export Excel
        </Button>
      </Box>
    )
}
export default Export;