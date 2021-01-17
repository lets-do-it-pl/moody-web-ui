import React from 'react';
import {Button, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogTitle,
        makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cancel: {
    backgroundColor: "#f44336",
    color : "white"
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{props.icon}</div>
      <Dialog open={open} fullWidth onClose={handleClose}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            {props.content}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className = {classes.cancel} variant = "contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}