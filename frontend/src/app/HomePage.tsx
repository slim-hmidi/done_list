import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "../components/Dialog";
import AddTaskForm from "../features/tasks/AddTaskForm";
import TaskList from "../features/tasks/TaskList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 380,
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const HomePage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
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
        open={open}
        title="Add new task"
        handleClose={handleClose}
      >
        <AddTaskForm />
      </Dialog>
    </div>
  );
};

export default HomePage;
