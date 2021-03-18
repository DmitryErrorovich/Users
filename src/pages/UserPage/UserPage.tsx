import React, { useState, useCallback, useMemo, useEffect } from "react";
import { History } from "history";
import get from "lodash/get";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import "./styles.css";
import { IUser, loading as ILoading } from "types/users";
import { IWeather } from "types/weather";
import WeatherIcon from "components/WeatherIcon";
import map from "lodash/map";
import UserDescription from "../../components/UserDescription";

const units = ["standart", "metric", "imperial"];

interface IProps {
  history: History;
  // fetchWeather: (payload: IPayload) => Promise<void>
  fetchWeather: any;
  weather: IWeather;
  loading: ILoading;
}
// TODO: REPLACE ALL IN XCOMPONENTS
export const UserPage = ({
  history,
  fetchWeather,
  weather,
  loading
}: IProps) => {
  const [unit, setUnit] = useState(units[0]);


  const handleChangeUnit = useCallback(e => setUnit(e.target.value), [setUnit]);

  const user: IUser = useMemo(() => get(history, "location.state"), [history]);

  const getTime = useCallback((time) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`
  },[])

  const loadWeather = useCallback(() => {
    console.log(unit);
    fetchWeather({
      lon: get(user, "location.coordinates.longitude"),
      lat: get(user, "location.coordinates.latitude"),
      unit
    });
  }, [user, fetchWeather, unit]);

  useEffect(() => loadWeather(), [loadWeather]);

  return (
    <>
    <div className={"Back-button_container"}>
    <Button variant="outlined" color="primary" onClick={() => history.goBack()}>
      Go back
    </Button>
    </div>
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <UserDescription user={user}/>
      {loading === ILoading.IDLE ? null : loading !== ILoading.SUCCEEDED ? (
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
              <Grid direction="column">
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
            <Grid direction="column">
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >Sunrise: {getTime(get(weather, "sys.sunrise"))}</Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >Sunset: {getTime(get(weather, "sys.sunset"))}</Typography>
            </Grid>
            <Grid direction="column">
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >Wind speed: {get(weather, "wind.speed")}</Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >Wind degree: {get(weather, "wind.deg")}</Typography>
                            <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >Pressure: {get(weather, "main.pressure")}</Typography>
            </Grid>
            </div>
          </CardContent>
        </Card>
      )}
    </Grid>
    </>
  );
};
