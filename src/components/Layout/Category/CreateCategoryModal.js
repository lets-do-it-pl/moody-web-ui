import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateCategoryForm from 'components/Layout/Category/CreateCategoryForm';
import AddIcon from '@material-ui/icons/Add';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AddIcon onClick={handleClickOpen}/>
      <Dialog open={open} fullWidth onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create</DialogTitle>
        <DialogContent>
            <CreateCategoryForm/>
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
