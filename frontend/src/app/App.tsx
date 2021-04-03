import React from 'react';
import {useSelector} from 'react-redux';
import Container from '@material-ui/core/Container';
import {Redirect} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core';
import {AppState} from './rootReducer';
import HomePage from './HomePage';
import AppBar from '../components/AppBar';
import {LoadingStatus} from 'types/index';

const App = (): JSX.Element => {
  const {username, loading} = useSelector((state: AppState) => ({
    username: state.authentication.user.username,
    loading: state.authentication.loading,
  }));

  if (loading === LoadingStatus.resolved && username) {
    return (
      <div>
        <AppBar />
        <Container>
          <HomePage />
        </Container>
      </div>
    );
  }

  if (loading === LoadingStatus.pending) {
    return <CircularProgress />;
  }

  return <Redirect to="/signin" />;
};

export default App;
