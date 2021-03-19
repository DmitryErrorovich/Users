import { createStructuredSelector } from 'reselect';
import { loading, fetchWeatherAction, weatherSelector } from '../../stores/weather';
import { UserPage } from './UserPage';
import { connect } from 'react-redux';
import {fetchUserAction, selectedUser} from "../../stores/users";

const mapState = createStructuredSelector({
  loading,
    weather: weatherSelector,
    selectedUser: selectedUser,
});

const mapDispatch = {
    fetchWeather: fetchWeatherAction,
    fetchUser: fetchUserAction
};

export default connect(mapState, mapDispatch)(UserPage);
