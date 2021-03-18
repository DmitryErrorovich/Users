import React, { useEffect,  useMemo, useCallback, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import map from "lodash/map";
import { IUser, loading as ILoading } from "types/users";
import get from "lodash/get";
import { ListItemText, Paper, ListItemAvatar, Avatar, Grid, Typography } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import "./styles.css";
import { ROUTES } from "navigation/const";
import { History } from "history";
import {getPaginationPage} from "../../utils/getPaginations";

interface IState {
  fetchUsers: any;
  loading: ILoading;
  users: Array<IUser>;
  history: History;
}

export const Home = ({ fetchUsers, loading, users, history, history: {replace, location: {search}} }: IState) => {
  const [page, setPage] = useState(getPaginationPage(search))

  useEffect(() => {
    fetchUsers({limit: 10, page: page});
  }, [fetchUsers, page]);

  const handleChangePage = useCallback((_, value) => {
    replace({search: `page=${value}`})
    setPage(value)
  }, [setPage, replace])

  const handleSelect = useCallback((user: any) => () => {
      handleChangePage(null,1)
    history.push(ROUTES.USER_PAGE,user)
  }, [history, handleChangePage])

  const usersList = useMemo(() => {
    return map(users, user => {
      return (
        <ListItem onClick={handleSelect(user)} key={`user-${get(user, "login.uuid")}`}>
          <ListItemAvatar>
            <Avatar alt={"UPS...No AVATAR"} src={user.picture.medium} />
          </ListItemAvatar>
          <ListItemText
            primary={`${user.name.title} ${user.name.first} ${user.name.last}`}
            secondary={`Location: ${user.location.state}`}
          />
        </ListItem>
      );
    });
  }, [users, handleSelect]);

  if (loading === ILoading.PENDING) {
    return <div>LOADING</div>;
  }
  return (
    <Paper className={"Main-paper"} elevation={6}>
        <Typography variant={"h3"}>Users List</Typography>
      <List>{usersList}</List>
      <Grid container justify={"center"} alignItems={"center"} >
      <Pagination className={'Pagination'} onChange={handleChangePage} page={page} count={10} color="primary" />
      </Grid>
      </Paper>
  );
};
