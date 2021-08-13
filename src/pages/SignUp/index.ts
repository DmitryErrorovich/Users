import {SignUpComponent} from './SignUp';
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";
import { loading, signInInfo, signUpAction } from 'stores/signIn';

const mapState = createStructuredSelector({
    loading,
    signInInfo
});

const mapDispatch = {
    signUp: signUpAction
};

export default connect(
  mapState,
  mapDispatch
)(SignUpComponent);
