import { createStructuredSelector } from "reselect";
import { updatingUser } from "../../stores/singleUser";
import { connect } from "react-redux";
import { UserDescription } from "./UserDescription";
import { editUsersAction, selectedUser } from "../../stores/singleUser";

const mapDispatch = {
  editUsers: editUsersAction
};

const mapState = createStructuredSelector({
  updatingUser,
  user: selectedUser
});

export default connect(
  mapState,
  mapDispatch
  // @ts-nocheck 
  // @ts-ignore
)(UserDescription);
