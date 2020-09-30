import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Choice {
  id: number;
  name: string;
}
interface Props {
  label: string;
  value: number;
  choices: Choice[];
  handleChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
}

const SelectField = (props: Props) => {
  const { label, value, choices, handleChange } = props;
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
      >
        {choices.map((choice: Choice) =>
          <MenuItem
            key={choice.id}
            value={choice.id}
          >
            {choice.name}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SelectField;
