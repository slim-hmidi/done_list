import 'date-fns';
import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';

interface Props {
  value: MaterialUiPickersDate;
  onChange: (arg: MaterialUiPickersDate) => void;
  format: string;
  label: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);

const DatePicker = (props: Props): JSX.Element => {
  const classes = useStyles();
  const {label, format, value, onChange} = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        className={classes.datePicker}
        variant="inline"
        format={format}
        margin="normal"
        label={label}
        value={value}
        autoOk
        inputVariant="outlined"
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
