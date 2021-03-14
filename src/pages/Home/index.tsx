import {connect} from "react-redux";
import {fetchUsersAction, loading, users} from "../../stores/users";
import {createStructuredSelector} from "reselect";
import {Home} from "./Home";

const mapState = createStructuredSelector({
  loading,
    users
});

const mapDispatch = {
    fetchUsers: fetchUsersAction,
};

export default connect(mapState, mapDispatch)(Home);