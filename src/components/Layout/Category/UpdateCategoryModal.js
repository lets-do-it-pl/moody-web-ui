import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import UpdateCategoryForm from './UpdateCategoryForm';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditIcon onClick={handleClickOpen}/>
      <Dialog open={open} fullWidth onClose={handleClose}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update</DialogTitle>
        <DialogContent>
            <UpdateCategoryForm 
              id = {props.id}
              order = {props.order}
              name = {props.name}
              image = {props.image}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant = "contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
