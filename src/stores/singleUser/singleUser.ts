import { ISingleUserInitialState } from "types/singleUser";
import { loading } from "types/users";

export const initialState: ISingleUserInitialState = { user: {}, loading: loading.IDLE, updating: loading.SUCCEEDED };