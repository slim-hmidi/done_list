import React, { ReactNode } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
}

const FormDialog = (props: Props) => {
  const { open, handleClose, title, children } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
