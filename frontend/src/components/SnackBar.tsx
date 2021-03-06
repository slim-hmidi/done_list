import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {SnackBarSeverity} from 'types';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  open: boolean;
  anchorOrigin: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  handleClose: (event: React.SyntheticEvent) => void;
  textMessage: string | null;
  severity: SnackBarSeverity;
}
const SnackBar = (props: Props): JSX.Element => {
  const {anchorOrigin, open, handleClose, textMessage, severity} = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={handleClose} severity={severity}>
        {textMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
