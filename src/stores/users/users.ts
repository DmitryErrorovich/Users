import { IUsersInitialState, loading } from "types/users";

export const initialState: IUsersInitialState = { users: [], user: {}, loading: loading.IDLE, updating: loading.SUCCEEDED };