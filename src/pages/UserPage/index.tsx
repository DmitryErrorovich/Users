import { createStructuredSelector } from 'reselect';
import { loading, fetchWeatherAction, weatherSelector } from '../../stores/weather';
import { UserPage } from './UserPage';
import { connect } from 'react-redux';
import {fetchUserAction, selectedUser, loading as usersLoading} from "../../stores/singleUser";

const mapState = createStructuredSelector({
  weatherLoading: loading,
    weather: weatherSelector,
    selectedUser: selectedUser,
    usersLoading
});

const mapDispatch = {
    fetchWeather: fetchWeatherAction,
    fetchUser: fetchUserAction
};

export default connect(mapState, mapDispatch)(UserPage);
