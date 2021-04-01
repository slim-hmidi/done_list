export type SnackBarSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | undefined;

export interface AlertSliceState {
  open: boolean;
  severity: SnackBarSeverity;
  message: string;
}

export interface AlertPayload {
  severity: SnackBarSeverity;
  message: string;
}
