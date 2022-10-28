import { SignInComponent } from './SignIn';
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";
import { loading, loginAction, signInInfo } from 'stores/signIn';

const mapState = createStructuredSelector({
  loading,
  signInInfo
});

const mapDispatch = {
  login: loginAction
};

export default connect(
  mapState,
  mapDispatch
  // @ts-nocheck 
  // @ts-ignore
)(SignInComponent);
