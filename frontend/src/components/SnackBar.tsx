import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export type SnackBarSeverity =
  | "success"
  | "info"
  | "warning"
  | "error"
  | undefined;
interface Props {
  open: boolean;
  anchorOrigin: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  handleClose: (event: React.SyntheticEvent) => void;
  textMessage: string | null;
  severity: SnackBarSeverity;
}
const SnackBar = (props: Props) => {
  const {
    anchorOrigin,
    open,
    handleClose,
    textMessage,
    severity,
  } = props;
  return (<Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
    anchorOrigin={anchorOrigin}
  >
    <Alert onClose={handleClose} severity={severity}>
      {textMessage}
    </Alert>
  </Snackbar>);
};

export default SnackBar;
