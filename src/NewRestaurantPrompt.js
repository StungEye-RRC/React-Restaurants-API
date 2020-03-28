import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

function NewRestaurantPrompt(props) {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [open, setOpen] = useState(false);

  /* Open/close helpers for our modal dialog. */

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const callAddHandler = () => {
    props.addRestaurantHandler(newName, newDescription);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Restaurant
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Restaurant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new website by providing a name and a description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Restaurant Name"
            fullWidth
            onChange={e => setNewName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            onChange={e => setNewDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={callAddHandler} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewRestaurantPrompt;
