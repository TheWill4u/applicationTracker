import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
function CreationModal({ open, modalTitle, close, create, check }) {
  const [title, setTitle] = useState("");
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          close();
          setTitle("");
        }}
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => {     
            //place validation here
            //if title exist on board and if empty
            //console.log(title)
            e.preventDefault()
            create(title);
            close();
            setTitle("")
          }}>
            <TextField
              required
              id="filled-required"
              label="Required"
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <DialogActions>
             <input type = "submit" value = "create"/>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreationModal;
