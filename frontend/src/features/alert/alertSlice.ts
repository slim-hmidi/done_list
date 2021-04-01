import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AlertSliceState, AlertPayload} from 'types';

export const initialState: AlertSliceState = {
  open: false,
  severity: undefined,
  message: '',
};
const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    openAlert: (
      state,
      {payload: {message, severity}}: PayloadAction<AlertPayload>,
    ) => {
      state.open = true;
      state.message = message;
      state.severity = severity;
    },
    closeAlert: (state) => {
      state.open = false;
    },
    resetAlert: () => {
      return initialState;
    },
  },
});

export const {openAlert, closeAlert, resetAlert} = alertSlice.actions;
export default alertSlice.reducer;
