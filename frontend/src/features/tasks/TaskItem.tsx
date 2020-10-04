import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
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
  chip: {
    marginTop: 12,
  },
  tag: {
    marginTop: 12,
    marginRight: 5,
  },
});

interface Props {
  title: string;
  description: string;
  realisationDate: string;
  tags: [{
    id: number;
    name: string;
  }];
}

const TaskItem = (props: Props) => {
  const classes = useStyles();
  const { title, description, realisationDate, tags } = props;
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
          variant="subtitle1"
          gutterBottom
        >
          {description}
        </Typography>
        <Grid container alignItems="flex-start">
          <Typography variant="subtitle1" className={classes.tag}>
            Tags:
          </Typography>
          {tags.map((tag: { id: number; name: string }) => (<Chip
            key={tag.id}
            label={tag.name}
            // color="primary"
            className={classes.chip}
          />))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
