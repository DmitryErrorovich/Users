export interface ISignInInitialState {
    loading: "idle" | "pending" | "succeeded" | "failed";
    email: string;
    password: string;
}
