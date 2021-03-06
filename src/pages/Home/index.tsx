import { connect } from "react-redux";
import { fetchUsersAction, loading, totalPages, users, cleanUsersAction } from "../../stores/users";
import { createStructuredSelector } from "reselect";
import { Home } from "./Home";

const mapState = createStructuredSelector({
  loading,
  users,
  totalPages
});

const mapDispatch = {
  cleanUsersStore: cleanUsersAction,
  fetchUsers: fetchUsersAction
};

export default connect(
  mapState,
  mapDispatch
)(Home);
