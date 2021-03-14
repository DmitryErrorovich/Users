import React, { useEffect,  useMemo, useCallback } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import map from "lodash/map";
import { IUser, loading as ILoading } from "types/users";
import get from "lodash/get";
import { ListItemText, Paper, ListItemAvatar, Avatar } from "@material-ui/core";
import "./styles.css";
import { ROUTES } from "navigation/const";
import { History } from "history";

interface IState {
  fetchUsers: any;
  loading: ILoading;
  users: Array<IUser>;
  history: History;
}

export const Home = ({ fetchUsers, loading, users, history }: IState) => {
  // const [selected, setSelected] = useState({})
  console.log(loading)
  useEffect(() => {
    fetchUsers(10);
  }, [fetchUsers]);

  const handleSelect = useCallback((user: any) => () => {
    history.push(ROUTES.USER_PAGE,user)
  }, [history])
console.log(history)
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
    <Paper>
      <List>{usersList}</List>
    </Paper>
  );
};
