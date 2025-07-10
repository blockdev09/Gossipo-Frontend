import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DeleteDialog = ({ open, onclose, ondelete }) => {
  return (
    <Dialog open={open} onClose={onclose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to Delete this Group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onclose}>No</Button>
        <Button color="error" onClick={ondelete}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
