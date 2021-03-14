import { IUsersInitialState, loading } from "types/users";

// First, create the thunk
export const initialState: IUsersInitialState = { users: [], loading: loading.IDLE };