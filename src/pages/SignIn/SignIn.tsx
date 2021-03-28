import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as Yup from "yup";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormikProps, withFormik } from 'formik';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';

interface IFormValues {
  username: string;
  password: string;
}

interface IProps {

}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({values, handleChange, touched, errors}: IProps & FormikProps<IFormValues>) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={()=>{}} className={classes.form}>
            {map(Object.keys(values), (item, index) => {
              return (
                <TextField
                  key={`${item}--${index}`}
                  fullWidth
                  id={item}
                  name={item}
                  label={capitalize(item)}
                  value={values[item]}
                  onChange={handleChange}
                  error={touched[item] && Boolean(errors[item])}
                  helperText={touched[item] && errors[item]}
                />
              );
            })}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});

const formikEnhance = withFormik<IProps, IFormValues>({
  validationSchema,
  enableReinitialize: true,
  mapPropsToValues: ({}) => {
    return {
      username: "",
      password: ""
    };
  },
  handleSubmit: async (
    { username, password }: IFormValues,
    formikBag
  ) => {

  }
});

export const SignInComponent = formikEnhance(SignIn);