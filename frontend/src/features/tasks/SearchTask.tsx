import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { getAllTasks } from "./taskSlice";
import { ReturnedTask } from "../../api/tasks/index";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AppState } from "../../app/rootReducer";
import { debounce } from "../../app/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    autocomplete: {
      margin: "0 auto",
      width: 300,
    },
  })
);

const SearchTask = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const debounceOnChange = useCallback(debounce(handleChange, 400), []);
  const { tasks, userId } = useSelector((state: AppState) => ({
    tasks: state.task.tasks,
    userId: state.authentication.user.userId,
  }));

  const options = tasks.length
    ? tasks.map((task: ReturnedTask) => ({ title: task.title }))
    : [];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleChange(
    e: React.ChangeEvent<{}>,
    value: string,
  ) {
    const queryParams = [`userId=${userId}`];
    if (value.length) {
      console.log(value);
      queryParams.push(`title=${value}`);
      dispatch(getAllTasks(queryParams));
    }
  }

  return (
    <Autocomplete
      //style={{ width: 300, margin="0 auto" }}
      className={classes.autocomplete}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onInputChange={(e: React.ChangeEvent<{}>, value: string) =>
        debounceOnChange(e, value)}
      getOptionSelected={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Tasks"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
};

export default SearchTask;
