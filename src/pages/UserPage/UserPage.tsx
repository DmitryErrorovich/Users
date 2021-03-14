import React, { useState, useCallback, useMemo, useEffect } from "react";
import { History } from "history";
// import { IPayload } from 'stores/weather';
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
  const [expanded, setExpand] = useState(false);
  const [unit, setUnit] = useState(units[0]);

  const toogleExpand = useCallback(() => setExpand(!expanded), [expanded]);

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
          <Button disabled={loading === ILoading.SUCCEEDED} onClick={loadWeather} size="small" color="secondary">
            See weather
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
      </Card>
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
