import { createStructuredSelector } from 'reselect';
import { loading } from '../../stores/weather';
import { connect } from 'react-redux';
import {UserDescription} from "./UserDescription";

const mapState = createStructuredSelector({
    loading,
});

export default connect(mapState)(UserDescription);
