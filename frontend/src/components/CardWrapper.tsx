import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
    },
    title: {
      color: theme.palette.primary.contrastText,
    },
  }),
);

interface Props {
  children: React.ReactNode;
  title: string;
  headerColor: boolean;
}

const CardWrapper = (props: Props): JSX.Element => {
  const classes = useStyles();
  const {children, title, headerColor} = props;

  const headerStyles = headerColor
    ? classNames(classes.root, classes.title)
    : '';
  return (
    <Card>
      <CardHeader className={headerStyles} title={title} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
