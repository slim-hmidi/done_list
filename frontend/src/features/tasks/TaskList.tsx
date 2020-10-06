import React from "react";
import { useSelector } from "react-redux";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TaskItem from "./TaskItem";
import { AppState } from "../../app/rootReducer";
import { Typography } from "@material-ui/core";
import { ReturnedTask } from "../../api/tasks/index";
import { formatDate } from "../../app/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "50%",
      margin: "0 auto",
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
    },
    typography: {
      margin: 50,
    },
  })
);

const TaskList = () => {
  const classes = useStyles();
  const { tasks, loading } = useSelector((state: AppState) => ({
    tasks: state.task.tasks,
    userId: state.authentication.user.userId,
    loading: state.task.loading,
  }));
  if (!tasks.length) {
    if (loading === "pending") {
      return <CircularProgress />;
    }
    return (<Typography
      variant="h6"
      align="center"
      className={classes.typography}
    >
      No Task Found
    </Typography>);
  }

  return (
    <List className={classes.root}>
      {tasks.map((task: ReturnedTask) => (<ListItem
        key={task.id}
        alignItems="flex-start"
      >
        <TaskItem
          title={task.title}
          realisationDate={formatDate(
            new Date(task.realisationDate),
            "yyyy-MM-dd",
          )}
          description={task.description}
          tags={task.tags}
        />
      </ListItem>))}
    </List>
  );
};

export default TaskList;
