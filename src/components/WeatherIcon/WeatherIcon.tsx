import React from "react";
import { Avatar } from "@material-ui/core";

interface IProps {
  iconURL: string;
}

export const WeatherIcon = ({ iconURL }: IProps) => {
  return <Avatar src={`http://openweathermap.org/img/wn/${iconURL}.png`} />;
};
