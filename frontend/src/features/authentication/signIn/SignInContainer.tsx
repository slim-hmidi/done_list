import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SignInForm from './SignInForm';
import SnackBar from '../../../components/SnackBar';
import {AppState} from '../../../app/rootReducer';
import {closeAlert, resetAlert} from '../../alert/alertSlice';

const SignIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const {open, message, severity} = useSelector(
    (state: AppState) => state.alert,
  );

  const handleClose = () => {
    dispatch(closeAlert());
  };

  useEffect(() => {
    dispatch(resetAlert());
  }, [dispatch]);

  return (
    <div>
      <SnackBar
        open={open}
        handleClose={handleClose}
        severity={severity}
        textMessage={message}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      />
      <SignInForm />
    </div>
  );
};

export default SignIn;
