import React, { useState, useCallback, useMemo, useEffect } from "react";
import { History } from "history";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Container
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import "./styles.css";
import { IUser, loading as ILoading } from "types/users";
import { IWeather } from "types/weather";
import WeatherIcon from "components/WeatherIcon";
import map from "lodash/map";
import UserDescription from "components/UserDescription";
import { WarningRounded } from "@material-ui/icons";

const units = ["standart", "metric", "imperial"];

interface IProps {
  history: History;
  // fetchWeather: (payload: IPayload) => Promise<void>
  fetchWeather: any;
  weather: IWeather;
  selectedUser: any;
  usersLoading: ILoading;
  fetchUser: any;
  weatherLoading: ILoading;
}
// TODO: REPLACE ALL IN XCOMPONENTS
export const UserPage = ({
  history,
  fetchWeather,
  weather,
  selectedUser,
  fetchUser,
  weatherLoading,
  usersLoading,
}: IProps) => {
  const [unit, setUnit] = useState(units[0]);

  const handleChangeUnit = useCallback(e => setUnit(e.target.value), [setUnit]);
  useEffect(() => fetchUser(get(history, "location.state._id")), [
    history,
    fetchUser
  ]);

  const user: IUser = useMemo(() => selectedUser, [selectedUser]);

  const getTime = useCallback(time => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  }, []);

  const loadWeather = useCallback(() => {
    if (isEmpty(user)) {
      return;
    }
    fetchWeather({
      lon: get(user, "location.coordinates.longitude") || 1,
      lat: get(user, "location.coordinates.latitude") || 1,
      unit
    });
  }, [user, fetchWeather, unit]);

  useEffect(() => loadWeather(), [loadWeather]);

  if (usersLoading === ILoading.FAILED) {
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: 100 }}>
        <Card
          style={{
            padding: "50px 10px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          elevation={6}
          className={"User_card"}
        >
          <WarningRounded color='primary' fontSize={'large'} />
          <Typography variant="h5" style={{ marginBottom: 20 }}>You are not authorized</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => history.goBack()}
          >
            Go back
          </Button>
        </Card>
      </Container>
    );
  }

  if (usersLoading !== ILoading.SUCCEEDED) {
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Card elevation={6} className={"User_card"}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Skeleton height={"120px"} width={"90%"} />

            <Skeleton height={"30px"} width={"90%"} />
            <Skeleton height={"60px"} width={"90%"} />
            <Skeleton height={"60px"} width={"90%"} />
          </div>
        </Card>
        <Card className={"Weather_card"}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Skeleton height={"130px"} width={"90%"} />
            <Skeleton height={"50px"} width={"90%"} />
            <Skeleton height={"50px"} width={"90%"} />
            <Skeleton height={"60px"} width={"90%"} />
          </div>
        </Card>
      </Grid>
    );
  }

  return (
    <>
      <div className={"Back-button_container"}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.goBack()}
        >
          Go back
        </Button>
      </div>
      <Grid container className={"Container"}>
        <UserDescription />
        {weatherLoading === ILoading.IDLE ? null : weatherLoading !==
          ILoading.SUCCEEDED ? (
          <Box>
            <Skeleton variant="rect" width={300} height={150} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width={"60%"} />
          </Box>
        ) : (
          <Card elevation={6} className={"Weather_card"}>
            <CardContent>
              <InputLabel>Unit</InputLabel>
              <Select
                value={unit}
                placeholder={"Unit"}
                onChange={handleChangeUnit}
              >
                {map(units, (u, index) => (
                  <MenuItem key={`unit-${index}`} value={u}>
                    {u}
                  </MenuItem>
                ))}
              </Select>
            </CardContent>

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Weather in {get(weather, "name") || get(user, "location.city")}
              </Typography>
              <div className={"Weather_icon"}>
                <WeatherIcon iconURL={weather.weather[0].icon} />
              </div>
              <div className={"Weather_description"}>
                <Grid container direction="column">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Temperature: {get(weather, "main.temp")}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Feels like: {get(weather, "main.feels_like")}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Min: {get(weather, "main.temp_min")}, Max:{" "}
                    {get(weather, "main.temp_max")}
                  </Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Sunrise: {getTime(get(weather, "sys.sunrise"))}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Sunset: {getTime(get(weather, "sys.sunset"))}
                  </Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Wind speed: {get(weather, "wind.speed")}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Wind degree: {get(weather, "wind.deg")}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    Pressure: {get(weather, "main.pressure")}
                  </Typography>
                </Grid>
              </div>
            </CardContent>
          </Card>
        )}
      </Grid>
    </>
  );
};
