import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import DatePicker from '../../components/DatePicker';
import TextField from '../../components/TextField';
import {addTask} from './taskSlice';
import {getTags} from '../tags/tagSlice';
import {AppState} from '../../app/rootReducer';
import SelectField from '../../components/SelectField';
import {formatDate} from '../../app/utils';
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      // margin: "0 auto",
      marginRight: 25,
      marginLeft: 25,
    },
    item: {
      marginTop: 16,
    },
    paper: {
      padding: 16,
    },
  }),
);

interface TouchedState {
  title: boolean;
  description: boolean;
  realisationDate: boolean;
  tagId: boolean;
}

interface ErrorState {
  title: string;
  description: string;
  realisationDate: string;
  tagId: string;
}

interface FormState {
  title: string;
  description: string;
  tagId: number;
  realisationDate: Date;
}

const AddTaskForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {userId, tags} = useSelector((state: AppState) => ({
    userId: state.authentication.user.userId,
    tags: state.tag.tags,
  }));
  const [state, setFormState] = useState<FormState>({
    title: '',
    description: '',
    realisationDate: new Date(),
    tagId: 0,
  });
  const [touched, setTouched] = useState<TouchedState>({
    title: false,
    description: false,
    tagId: false,
    realisationDate: false,
  });
  const [error, setError] = useState<ErrorState>({
    title: '',
    description: '',
    tagId: '',
    realisationDate: '',
  });

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);
  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.trim();
    setFormState((formState: FormState) => {
      return {...formState, [name]: value};
    });
  };
  const handleBlur = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {value} = e.target;
    setTouched((formState: TouchedState) => {
      return {...formState, [name]: true};
    });
    if (!value.trim()) {
      setError((formState: ErrorState) => {
        return {...formState, [name]: `${name} required`};
      });
    } else {
      setError((formState: ErrorState) => {
        return {...formState, [name]: ''};
      });
    }
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setFormState((formState: FormState) => {
      return {...formState, birthday: date};
    });
  };

  const handleTagChange = (event: React.ChangeEvent<{value: unknown}>) => {
    setFormState((formState: FormState) => ({
      ...formState,
      tagId: event.target.value as number,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      ...state,
      realisationDate: formatDate(state.realisationDate, 'yyyy-MM-dd'),
      userId,
    };
    dispatch(addTask(data));
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center" spacing={3}>
          <Grid item md={12}>
            <TextField
              label="Title"
              required
              fullWidth
              type="text"
              value={state.title}
              onChange={handleChange('title')}
              touched={touched.title}
              error={error.title}
              onBlur={handleBlur('title')}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Description"
              required
              fullWidth
              type="text"
              multiline
              rows={4}
              value={state.description}
              onChange={handleChange('description')}
              touched={touched.description}
              error={error.description}
              onBlur={handleBlur('description')}
            />
          </Grid>
          <Grid item md={12}>
            <DatePicker
              label="Realisation Date"
              value={state.realisationDate}
              onChange={handleDateChange}
              format="yyyy-MM-dd"
            />
          </Grid>
          <Grid item md={12}>
            <SelectField
              label="Tag"
              value={state.tagId}
              handleChange={handleTagChange}
              choices={tags}
            />
          </Grid>

          <Grid item className={classes.item}>
            <Button variant="contained" color="primary" type="submit">
              Add Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddTaskForm;
