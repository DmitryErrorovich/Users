import { AppTopBar } from './AppTopBar';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { logOutAction, signInInfo } from "../../stores/signIn";

const mapState = createStructuredSelector({
    signInInfo
});

const mapDispatch = {
    logOut: logOutAction
}

export default connect(
    mapState,
    mapDispatch
)(AppTopBar);
