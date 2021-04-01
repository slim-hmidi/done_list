import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SignUpForm from './SignUpForm';
import SnackBar from 'components/SnackBar';
import {AppState} from 'app/rootReducer';
import {closeAlert, resetAlert} from '../../alert/alertSlice';

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const {open, message, severity} = useSelector(
    (state: AppState) => state.alert,
  );
  useEffect(() => {
    dispatch(resetAlert());
  }, [dispatch]);
  const handleClose = () => {
    dispatch(closeAlert());
  };

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
      <SignUpForm />
    </div>
  );
};

export default SignUp;
