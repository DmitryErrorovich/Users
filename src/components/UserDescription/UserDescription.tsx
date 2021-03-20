import React, { useState, useCallback} from "react";
import get from "lodash/get";
import map from "lodash/map";
import capitalize from 'lodash/capitalize';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Collapse,
    TextField,
    Divider,
} from "@material-ui/core";
import "./styles.css";
import { IUser } from "../../types/users/index";
import {FormikProps, withFormik} from "formik";
import * as Yup from 'yup';
import { loading as ILoading } from "../../types/users";

interface IFormValues {
    first: string;
    last: string;
    city: string;
    country: string;
}

interface IProps {
    user: IUser;
    editUsers: (arg0: IUser) => void;
    updatingUser: ILoading;
}

const UserDesc = ({user, dirty, updatingUser, handleSubmit, handleChange, errors, values, touched}: IProps & FormikProps<IFormValues>) => {
    const [expanded, setExpand] = useState(false);
    const [expandedEdit, setExpandEdit] = useState(false)
    const toogleExpand = useCallback(() => {
      setExpand(!expanded)
      setExpandEdit(false)
    }, [setExpand,expanded, setExpandEdit]);

    const expandEdit = useCallback(() => { 
      setExpandEdit(!expandedEdit)
      setExpand(false)
    },[setExpandEdit, expandedEdit, setExpand])

    return (
        <Card elevation={6} className={"User_card"}>
            <CardMedia
                className={"User_media"}
                image={get(user, "picture.large")}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {`${get(user, "name.title")} ${get(user, "name.last")}`}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    Country: {get(user, "location.country")}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {get(user, "location.state") &&
                    `State: ${get(user, "location.state")}, `}
                    City: {get(user, "location.city")}
                </Typography>
            </CardContent>
            <CardActions className={"User_actions"}>
                <Button onClick={expandEdit} size="small" color="secondary">
                    Edit
                </Button>
                <Button
                    onClick={toogleExpand}
                    size="small"
                    color={expanded ? "default" : "primary"}
                >
                    {expanded ? "Close details" : "Show details"}
                </Button>
            </CardActions>
            <Collapse
                className={"User_collapse"}
                in={expanded}
                timeout="auto"
                unmountOnExit
            >
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Details
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Gender: {user.gender}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Username: {user.login.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Age: {user.dob.age}
                    </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Contact info
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Cell: {user.cell}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Phone: {user.phone}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Email: {user.email}
                    </Typography>
                </CardContent>
            </Collapse>
            <Collapse
                className={"User_collapse"}
                in={expandedEdit}
                timeout="auto"
                unmountOnExit
            >
                <CardContent>
                <form onSubmit={handleSubmit}>

                    {map(Object.keys(values), (item, index) => {
                        return <TextField
                            key={`${item}--${index}`}
                            fullWidth
                            id={item}
                            disabled={updatingUser !== ILoading.SUCCEEDED}
                            name={item}
                            label={capitalize(item)}
                            value={values[item]}
                            onChange={handleChange}
                            error={touched[item] && Boolean(errors[item])}
                            helperText={touched[item] && errors[item]}
                        />
                    })}
                    <div style={{padding: '10px'}} />
                    <Button disabled={updatingUser !== ILoading.SUCCEEDED || !dirty} color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const validationSchema = Yup.object().shape({
    first: Yup.string()
        .required('First name is required'),
    last: Yup.string()
        .required('Last name is required'),
});

const formikEnhance = withFormik<IProps, IFormValues>({
    validationSchema,
    enableReinitialize: true,
    mapPropsToValues: ({user: {name: {first,last}, location: {city, country}}}) => {
      console.log({
        first,
        last,
        city,
        country
      })
        return {
            first,
            last,
            city,
            country: !country ? "" : country
        }
    },
    handleSubmit: async ({ first, last, city, country}: IFormValues, formikBag) => {
        await formikBag.props.editUsers({ ...formikBag.props.user, name: { ...formikBag.props.user.name,first, last },location: {...formikBag.props.user.location,city, country }})
    },
});

export const UserDescription = formikEnhance(UserDesc)

