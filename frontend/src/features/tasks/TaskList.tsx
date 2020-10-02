import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TaskItem from "./TaskItem";
import { AppState } from "../../app/rootReducer";
import { getAllTasks } from "./taskSlice";
import { Typography } from "@material-ui/core";
import { Task } from "../../api/tasks/index";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, userId, loading } = useSelector((state: AppState) => ({
    tasks: state.task.tasks,
    userId: state.authentication.user.userId,
    loading: state.task.loading,
  }));
  useEffect(() => {
    dispatch(getAllTasks(userId));
  }, [userId, dispatch]);

  if (!tasks.length) {
    if (loading === "pending") {
      return <CircularProgress />;
    }
    return (<Typography>No Task Found</Typography>);
  }

  return (
    <List>
      {tasks.map((task: Task) => (<ListItem key={task.id}>
        <TaskItem
          title={task.title}
          realisationDate={task.realisationDate}
          description={task.description}
        />
      </ListItem>))}
    </List>
  );
};

export default TaskList;
