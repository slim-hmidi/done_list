import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "../features/authentication/signIn/SignInContainer";
import { AppState } from "./rootReducer";
import { closeAlert, resetAlert } from "../features/alert/alertSlice";
import SnackBar from "../components/SnackBar";

// import { isAuthenticated } from "./utils";

function App() {
  const username = useSelector((state: AppState) =>
    state.authentication.username
  );
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state: AppState) =>
    state.alert
  );
  const handleClose = () => {
    dispatch(closeAlert());
  };

  useEffect(() => {
    dispatch(resetAlert());
  }, []);

  return (
    // <div>{isAuthenticated() ? <h1>Hello World</h1> : <SignIn />}</div>
    <div>
      <SnackBar
        open={open}
        handleClose={handleClose}
        severity={severity}
        textMessage={message}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      />
      {username ? <h1>Hello World</h1> : <SignIn />}
    </div>
  );
}

export default App;