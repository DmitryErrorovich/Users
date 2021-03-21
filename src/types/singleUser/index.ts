import { IUser } from "types/users";

export interface ISingleUserInitialState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  user: IUser | {};
  updating: "idle" | "pending" | "succeeded" | "failed";
}
