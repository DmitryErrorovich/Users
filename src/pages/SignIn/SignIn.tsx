import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import { ROUTES } from 'navigation/const';
import { History } from "history";

interface IFormValues {
  email: string;
  password: string;
}

interface IProps {
  signInInfo: IFormValues;
  login: (loginInfo: IFormValues) => any;
  history: History;
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

const SignIn = ({ values, handleChange, handleSubmit, touched, errors }: IProps & FormikProps<IFormValues>) => {
  const classes = useStyles();
  console.log({ values })
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
        <form onSubmit={handleSubmit} className={classes.form}>
          {map(Object.keys(values), (item, index) => {
            return (
              <TextField
                key={`${item}--${index}`}
                fullWidth
                id={item}
                name={item}
                label={capitalize(item)}
                value={values[item]}
                type={item === "password" ? "password" : "default"}
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
              <Link href="/sign_up" variant="body2">
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
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required")
});

const formikEnhance = withFormik<IProps, IFormValues>({
  validationSchema,
  enableReinitialize: true,
  mapPropsToValues: ({ signInInfo: { email, password } }) => {
    return {
      email,
      password
    };
  },
  handleSubmit: async (
    { email, password }: IFormValues,
    formikBag
  ) => {
    const res = await formikBag.props.login({ email, password })
    console.log({ res })
    if (res.payload.token) {
      localStorage.setItem("token", res.payload.token);
      formikBag.props.history.push(ROUTES.ROOT);
    }
  }
});

export const SignInComponent = formikEnhance(SignIn);