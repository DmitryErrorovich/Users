import { createStructuredSelector } from 'reselect';
import { updatingUser} from '../../stores/users';
import { connect } from 'react-redux';
import {UserDescription} from "./UserDescription";
import {editUsersAction, selectedUser} from "../../stores/users";


const mapDispatch = {
    editUsers: editUsersAction,
};


const mapState = createStructuredSelector({
  updatingUser,
    user: selectedUser
});

export default connect(mapState, mapDispatch)(UserDescription);
