import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';
import {AppState} from 'app/rootReducer';
import {addTask} from './taskSlice';
import {formatDate} from 'app/utils';
import {getTags} from '../tag/tagSlice';
import DatePicker from 'components/DatePicker';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {TaskForm, TouchedFields, ErrorFields} from 'types';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
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

const AddTaskForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {userId, tags} = useSelector((state: AppState) => ({
    userId: state.authentication.user.userId,
    tags: state.tag.tags,
  }));
  const [state, setFormState] = useState<TaskForm>({
    title: '',
    description: '',
    realisationDate: new Date(),
    tagId: 0,
  });
  const [touched, setTouched] = useState<TouchedFields>({
    title: false,
    description: false,
    tagId: false,
    realisationDate: false,
  });
  const [error, setError] = useState<ErrorFields>({
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
    setFormState((formState: TaskForm) => {
      return {...formState, [name]: value};
    });
  };
  const handleBlur = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {value} = e.target;
    setTouched((formState: TouchedFields) => {
      return {...formState, [name]: true};
    });
    if (!value.trim()) {
      setError((formState: ErrorFields) => {
        return {...formState, [name]: `${name} required`};
      });
    } else {
      setError((formState: ErrorFields) => {
        return {...formState, [name]: ''};
      });
    }
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setFormState((formState: TaskForm) => {
      return {...formState, birthday: date};
    });
  };

  const handleTagChange = (event: React.ChangeEvent<{value: unknown}>) => {
    setFormState((formState: TaskForm) => ({
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
