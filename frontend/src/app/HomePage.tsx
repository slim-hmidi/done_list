import React from "react";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

const HomePage = () => {
  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<CreateIcon />}
    >
      Add Task
    </Button>
  );
};

export default HomePage;
