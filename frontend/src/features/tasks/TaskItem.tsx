import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const getRandomColor = () => {
  let hex = Math.floor(Math.random() * 0xFFFFFF);
  let color = "#" + hex.toString(16);

  return color;
};

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface Props {
  title: string;
  description: string;
  realisationDate: string;
}

const TaskItem = (props: Props) => {
  const classes = useStyles();
  const { title, description, realisationDate } = props;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar
          aria-label="recipe"
          style={{
            backgroundColor: getRandomColor(),
          }}
        >
          {title.charAt(0).toUpperCase()}
        </Avatar>}
        title={title}
        subheader={realisationDate}
      />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {description}
        </Typography>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
