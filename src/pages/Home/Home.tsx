import React, { useEffect, useMemo, useCallback, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import map from "lodash/map";
import { IUser, loading as ILoading } from "types/users";
import get from "lodash/get";
import {
  ListItemText,
  Paper,
  ListItemAvatar,
  Avatar,
  Grid,
  Typography,
  TextField
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import "./styles.css";
import { ROUTES } from "navigation/const";
import { History } from "history";
import { getPaginationPage, getSearchValue } from "../../utils/getURLParams";
import Skeleton from "@material-ui/lab/Skeleton";
import { debounce, throttle } from "lodash";

interface IState {
  fetchUsers: any;
  loading: ILoading;
  users: Array<IUser>;
  totalPages: number;
  history: History;
  fetchUser: any;
}

export const Home = ({
  fetchUsers,
  loading,
  users,
  history,
  totalPages,
  history: {
    replace,
    location: { search }
  }
}: IState) => {
  const [page, setPage] = useState(getPaginationPage(search));
  const [searchValue, setSearch] = useState(getSearchValue(search));

  const handleChangePage = useCallback(
    (_, value) => {
      replace({ search: `page=${value}` });
      setPage(value);
    },
    [setPage, replace]
  );
  const debouncedFetch = useCallback(
		debounce((debPage, debSearchValue) => fetchUsers({ limit: 10, page: debPage, searchValue:debSearchValue }), 300),
		[], // will be created only once initially
  );

  useEffect(() => {
    debouncedFetch(page, searchValue)
  }, [page, searchValue, debouncedFetch]);
  
  const handleChangeSearch = useCallback(
    event => {
      replace({
        search: `${
          event.target.value ? `searchValue=${event.target.value}` : ""
        }`
      });
      setSearch(event.target.value);
      setPage(1)
    },
    [replace, setSearch, setPage]
  );

  const handleSelect = useCallback(
    (user: any) => () => {
      handleChangePage(null, 1);
      history.push(ROUTES.USER_PAGE, user);
    },
    [history, handleChangePage]
  );

  const usersList = useMemo(() => {
    return map(users, user => {
      return (
        <ListItem
          onClick={handleSelect(user)}
          key={`user-${get(user, "login.uuid")}`}
        >
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

  return (
    <Paper className={"Main-paper"} elevation={6}>
      <Typography variant={"h3"}>Users List</Typography>
      <TextField
        value={searchValue}
        onChange={handleChangeSearch}
        label={"Search..."}
      />
      {loading !== ILoading.SUCCEEDED ? (
        <>
          <Skeleton height={"100px"} />
          <Skeleton height={"100px"} />
          <Skeleton height={"100px"} />
          <Skeleton height={"100px"} />
          <Skeleton height={"100px"} />
          <Skeleton height={"100px"} />
          <Skeleton height={"100px"} />
        </>
      ) : (
        <>
          <List>{usersList}</List>
          <Grid container justify={"center"} alignItems={"center"}>
            <Pagination
              className={"Pagination"}
              onChange={handleChangePage}
              page={page}
              count={totalPages}
              color="primary"
            />
          </Grid>
        </>
      )}
    </Paper>
  );
};
