import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "../components/Dialog";
import AddTaskForm from "../features/tasks/AddTaskForm";
import TaskList from "../features/tasks/TaskList";
import SearchField from "../features/tasks/SearchTask";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const HomePage = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <SearchField />
      <TaskList />
      <Tooltip title="New Task" aria-label="add">
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClick}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={openDialog}
        title="Add new task"
        handleClose={handleClose}
      >
        <AddTaskForm />
      </Dialog>
    </div>
  );
};

export default HomePage;
