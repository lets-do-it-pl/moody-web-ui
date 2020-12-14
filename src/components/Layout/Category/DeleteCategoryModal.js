import React from 'react';
import {connect} from "react-redux";
import * as actions from 'actions/categoryAction';
import {makeStyles,
        Button,
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  submit: {
    backgroundColor: "#5cb85c",
    color : "white"
  },
}));

const DeleteCategoryModal = ({...props}) => {
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
      <DeleteIcon onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Delete Category"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.submit} onClick={() => props.deleteCategory(props.categoryId)} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="secondary" variant = "contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapActionToProps = {
    deleteCategory : actions.deleteCategory
}

export default connect(null, mapActionToProps)(DeleteCategoryModal);