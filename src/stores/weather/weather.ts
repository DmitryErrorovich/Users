import { IWeatherInitialState } from "types/weather";
import { loading } from "../../types/users";

export const initialState: IWeatherInitialState = {
  weather: undefined,
  loading: loading.IDLE
};
