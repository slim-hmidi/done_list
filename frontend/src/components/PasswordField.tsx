import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      flexBasis: 200,
    },
  })
);

interface IProps {
  onBlur: (arg: any) => void;
  onChange: (arg: any) => void;
  value: string;
  fullWidth: boolean;
  touched?: boolean;
  error?: string;
  required: boolean;
}
const PasswordWrapper = (props: IProps) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const {
    fullWidth,
    value,
    onChange,
    onBlur,
    touched,
    error,
    required,
  } = props;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      className={clsx(classes.margin, classes.textField)}
      variant="outlined"
      type={showPassword ? "text" : "password"}
      label="Password"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={!!(touched && error)}
      helperText={touched && error ? error : ""}
      fullWidth={fullWidth}
      required={required}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordWrapper;
