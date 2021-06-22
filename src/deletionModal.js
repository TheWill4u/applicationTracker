import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import DialogContentText from "@material-ui/core/DialogContentText";

function DeletionModal({ open, close, modalTitle, deleteBoard }) {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle id="alert-dialog-title">
        {`delete ${modalTitle}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {modalTitle}? It will be gone
          forever...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteBoard} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletionModal;
