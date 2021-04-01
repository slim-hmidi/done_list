import React, {useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import CardWrapper from 'components/CardWrapper';
import TextField from 'components/TextField';
import PasswordField from 'components/PasswordField';
import {signIn} from '../authenticationSlice';
import {TouchedFields, SignInForm} from 'types';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: '0 auto',
      width: '30%',
    },
    item: {
      marginTop: 16,
    },
    paper: {
      padding: 16,
    },
  }),
);

const SignIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setStateForm] = useState<SignInForm>({
    username: '',
    password: '',
  });
  const [touched, setTouched] = useState<TouchedFields>({
    username: false,
    password: false,
  });
  const [error, setError] = useState<SignInForm>({
    username: '',
    password: '',
  });

  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.trim();
    setStateForm((state) => {
      return {...state, [name]: value};
    });
  };
  const handleBlur = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {value} = e.target;
    setTouched((state) => {
      return {...state, [name]: true};
    });
    if (!value.trim()) {
      setError((state) => {
        return {...state, [name]: `${name} required`};
      });
    } else {
      setError((state) => {
        return {...state, [name]: ''};
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(state));
  };
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <CardWrapper title="SignIn" headerColor>
          <Grid container alignContent="center" justify="center" spacing={3}>
            <Grid item md={12}>
              <TextField
                label="Username"
                required
                fullWidth
                type="text"
                value={state.username}
                onChange={handleChange('username')}
                touched={touched.username}
                error={error.username}
                onBlur={handleBlur('username')}
              />
            </Grid>
            <Grid item md={12}>
              <PasswordField
                required
                fullWidth
                value={state.password}
                onChange={handleChange('password')}
                touched={touched.password}
                error={error.password}
                onBlur={handleBlur('password')}
              />
            </Grid>
            <Grid item className={classes.item}>
              <Button variant="contained" color="primary" type="submit">
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
