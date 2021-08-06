import { ISignInInitialState } from "types/signIn";
import { loading } from "../../types/users";

export const initialState: ISignInInitialState = {
  email: "",
  password: "",
  loading: loading.IDLE,
  name: ""
};
