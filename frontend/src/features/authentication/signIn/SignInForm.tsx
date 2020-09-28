import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CardWrapper from "../../../components/CardWrapper";
import TextField from "../../../components/TextField";
import PasswordField from "../../../components/PasswordField";
import { signIn } from "../authenticationSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: "0 auto",
      width: "30%",
    },
    item: {
      marginTop: 16,
    },
    paper: {
      padding: 16,
    },
  })
);

interface TouchedState {
  username: boolean;
  password: boolean;
  [key: string]: boolean;
}

interface StateForm {
  username: string;
  password: string;
  [x: string]: string;
}

const SignIn = ({ pristine, submitting, handleSubmit }: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setStateForm] = useState<StateForm>({
    username: "",
    password: "",
  });
  const [touched, setTouched] = useState<TouchedState>({
    username: false,
    password: false,
  });
  const [error, setError] = useState<StateForm>({
    username: "",
    password: "",
  });

  const handleChange = (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setStateForm((state) => {
        return { ...state, [name]: value };
      });
    };
  const handleBlur = (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setTouched((state) => {
        return { ...state, [name]: true };
      });
      if (!value.trim()) {
        setError((state) => {
          return { ...state, [name]: `${name} required` };
        });
      } else {
        setError((state) => {
          return { ...state, [name]: "" };
        });
      }
    };

  handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(signIn(state));
  };
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <CardWrapper
          title="SignIn"
          headerColor={true}
        >
          <Grid
            container
            alignContent="center"
            justify="center"
            spacing={3}
          >
            <Grid item md={12}>
              <TextField
                label="Username"
                required
                fullWidth
                type="text"
                value={state.username}
                onChange={handleChange("username")}
                touched={touched.username}
                error={error.username}
                onBlur={handleBlur("username")}
              />
            </Grid>
            <Grid item md={12}>
              <PasswordField
                required
                fullWidth
                value={state.password}
                onChange={handleChange("password")}
                touched={touched.password}
                error={error.password}
                onBlur={handleBlur("password")}
              />
            </Grid>
            <Grid item className={classes.item}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={pristine || submitting}
              >
                SignIn
              </Button>
              <Grid item className={classes.item}>
                <Link to="/signup">Sign up</Link>
              </Grid>
            </Grid>
          </Grid>
        </CardWrapper>
      </form>
    </div>
  );
};

export default SignIn;
