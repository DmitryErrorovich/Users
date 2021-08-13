import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import * as Yup from "yup";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { loading as ILoading } from "types/users";
import Container from '@material-ui/core/Container';
import { FormikProps, withFormik } from 'formik';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';

interface IFormValues {
  email: string;
  password: string;
  name: string;
}

interface IProps {
  signInInfo: IFormValues;
  loading: ILoading;
  signUp: (signUpInfo: IFormValues) => void;
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

const SignUp = ({values, handleChange, handleSubmit, touched, errors, loading}: IProps & FormikProps<IFormValues>) => {
  const classes = useStyles();
  console.log({loading})
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                  disabled={loading === ILoading.PENDING}
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
            disabled={loading === ILoading.PENDING}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  name: Yup.string().required("Name is required"),  
});

const formikEnhance = withFormik<IProps, IFormValues>({
  validationSchema,
  enableReinitialize: true,
  mapPropsToValues: ({signInInfo: {email, password, name}}) => {
    return {
        name,
      email,
      password
    };
  },
  handleSubmit: async (
    { email, password, name }: IFormValues,
    formikBag
  ) => {
    await formikBag.props.signUp({email, password, name})
  }
});

export const SignUpComponent = formikEnhance(SignUp);