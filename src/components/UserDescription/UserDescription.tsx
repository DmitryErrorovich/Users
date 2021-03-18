import React, { useState, useCallback} from "react";
import get from "lodash/get";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Collapse,
    Divider,
} from "@material-ui/core";
import "./styles.css";
import { IUser } from "types/users";

interface IProps {
    user: IUser;
}

export const UserDescription = ({user}: IProps) => {
    const [expanded, setExpand] = useState(false);
    const [expandedEdit, setExpandEdit] = useState(false)

    const toogleExpand = useCallback(() => setExpand(!expanded), [setExpand,expanded]);

    const expandEdit = useCallback(() => setExpandEdit(!expandedEdit),[setExpandEdit, expandedEdit])

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
                    
                    {/* <Typography gutterBottom variant="h6" component="h2">
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
                    </Typography> */}
                </CardContent>
                <Divider />
                {/* <CardContent>
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
                </CardContent> */}
            </Collapse>
        </Card>
    )
}