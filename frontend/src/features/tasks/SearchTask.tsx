import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "./taskSlice";
import { ReturnedTask } from "../../api/tasks/index";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AppState } from "../../app/rootReducer";

interface TaskType {
  title: string;
}
const SearchTask = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { tasks, userId } = useSelector((state: AppState) => ({
    tasks: state.task.tasks,
    userId: state.authentication.user.userId,
  }));

  // const loadingOptions = open && tasks.length === 0;
  const options = tasks.length
    ? tasks.map((task: ReturnedTask) => ({ title: task.title }))
    : [];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (
    e: React.ChangeEvent<{}>,
    value: string,
  ) => {
    const queryParams = [`userId=${userId}`];
    console.log(value);
    if (value) {
      queryParams.push(`title=${value}`);
    }
    dispatch(getAllTasks(queryParams));
  };

  return (
    <Autocomplete
      style={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onInputChange={handleChange}
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
