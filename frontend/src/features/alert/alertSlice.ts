import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackBarSeverity } from "../../components/SnackBar";

interface InitialState {
  open: boolean;
  severity: SnackBarSeverity;
  message: string;
}

interface AlertPayload {
  severity: SnackBarSeverity;
  message: string;
}
const initialState: InitialState = {
  open: false,
  severity: undefined,
  message: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openAlert: (
      state,
      { payload: {message, severity} }: PayloadAction<AlertPayload>,
    ) => {
      state.open = true;
      state.message = message;
      state.severity = severity;
    },
    closeAlert: (state) => {
      state.open = false;
    },
    resetAlert: (state) => {
      state = initialState;
    },
  },
});

export const { openAlert, closeAlert, resetAlert } = alertSlice.actions;
export default alertSlice.reducer;
