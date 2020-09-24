import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CardWrapper from "../../components/CardWrapper";
import TextField from "../../components/TextField";
import PasswordField from "../../components/PasswordField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      margin: "auto",
      maxWidth: "100%",
      padding: 16,
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
  email: boolean;
  [key: string]: boolean;
}

interface ErrorState {
  username: string;
  email: string;
  [x: string]: string;
}

const SignIn = ({ pristine, submitting, handleSubmit }: any) => {
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState<TouchedState>({
    username: false,
    email: false,
  });
  const [error, setError] = useState<ErrorState>({
    username: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setUsername(value);
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPassword(value);
  };
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <CardWrapper
          title="SignIn"
          headerColor={true}
        >
          <Grid container justify="center" spacing={3}>
            <Grid item md={12}>
              <TextField
                label="Username"
                required
                fullWidth
                type="text"
                value={username}
                onChange={handleUsernameChange}
                touched={touched.username}
                error={error.username}
                onBlur={handleBlur("username")}
              />
            </Grid>
            <Grid item md={12}>
              <PasswordField
                required
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                touched={touched.email}
                error={error.email}
                onBlur={handleBlur("email")}
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
