import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import Dialog from "../components/Dialog";
import AddTaskForm from "../features/tasks/AddTaskForm";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<CreateIcon />}
        onClick={handleClick}
      >
        Add Task
      </Button>
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
