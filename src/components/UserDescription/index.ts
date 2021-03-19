import { createStructuredSelector } from 'reselect';
import { loading} from '../../stores/weather';
import { connect } from 'react-redux';
import {UserDescription} from "./UserDescription";
import {editUsersAction, selectedUser} from "../../stores/users";


const mapDispatch = {
    editUsers: editUsersAction,
};


const mapState = createStructuredSelector({
    loading,
    user: selectedUser
});

export default connect(mapState, mapDispatch)(UserDescription);
