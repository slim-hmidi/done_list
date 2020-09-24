import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CardWrapper from "../../components/CardWrapper";
import DatePicker from "../../components/DatePicker";
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

interface FormState {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp = ({ pristine, submitting, handleSubmit }: any) => {
  const classes = useStyles();
  const [state, setFormState] = useState<FormState>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [birthday, setBirthday] = React.useState<Date>(
    new Date("2000-01-18"),
  );
  const [touched, setTouched] = useState<TouchedState>({
    username: false,
    email: false,
  });
  const [error, setError] = useState<ErrorState>({
    username: "",
    email: "",
  });

  const handleChange = (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setFormState((state) => {
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

  const handleDateChange = (date: Date) => {
    setBirthday(date);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <CardWrapper
          title="SignUp "
          headerColor={true}
        >
          <Grid container justify="center" spacing={3}>
            <Grid item md={12}>
              <TextField
                label="First name"
                required
                fullWidth
                type="text"
                value={state.firstName}
                onChange={handleChange("firstName")}
                touched={touched.firstName}
                error={error.firstName}
                onBlur={handleBlur("firstName")}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                label="Last Name"
                required
                fullWidth
                type="text"
                value={state.lastName}
                onChange={handleChange("lastName")}
                touched={touched.lastName}
                error={error.lastName}
                onBlur={handleBlur("lastName")}
              />
            </Grid>
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
              <DatePicker
                label="Birthday"
                value={birthday}
                onChange={handleDateChange}
                format="yyyy-MM-dd"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                label="Email"
                required
                fullWidth
                type="email"
                value={state.email}
                onChange={handleChange("email")}
                touched={touched.email}
                error={error.email}
                onBlur={handleBlur("email")}
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
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </CardWrapper>
      </form>
    </div>
  );
};

export default SignUp;
