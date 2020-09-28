import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
);

interface Props {
  label: string;
  onChange: (arg: any) => void;
  onBlur: (arg: any) => void;
  value: string;
  type: string;
  fullWidth: boolean;
  touched: boolean;
  error: string;
  required: boolean;
  multiline?: boolean;
  rows?: number;
}

function SimpleTextField(props: Props) {
  const classes = useStyles();

  const {
    required,
    label,
    touched,
    error,
    type,
    value,
    onChange,
    onBlur,
    fullWidth,
    multiline,
    rows,
  } = props;
  return (
    <TextField
      required={required}
      className={classes.textField}
      label={label}
      error={!!(touched && error)}
      margin="normal"
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      variant="outlined"
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      helperText={touched && error ? error : ""}
    />
  );
}

export default SimpleTextField;
