import React from 'react';
import {makeStyles,
        Button,
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {categoryService} from '../../../_services/categoryService';

const useStyles = makeStyles((theme) => ({
  submit: {
    backgroundColor: "#5cb85c",
    color : "white"
  },
  cancel: {
    backgroundColor: "#f44336",
    color : "white"
  },
  delete: {
    color: "red"
  }
}));

const DeleteCategoryForm = ({...props}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DeleteIcon onClick={handleClickOpen} className = {classes.delete}/>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.submit} color="primary" 
                  onClick = {() => categoryService.deleteCategory(props.id)}>
            Confirm
          </Button>
          <Button onClick={handleClose} className = {classes.cancel} variant = "contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeleteCategoryForm;