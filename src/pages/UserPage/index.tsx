import { createStructuredSelector } from 'reselect';
import { loading, fetchWeatherAction, weatherSelector } from '../../stores/weather';
import { UserPage } from './UserPage';
import { connect } from 'react-redux';

const mapState = createStructuredSelector({
  loading,
    weather: weatherSelector
});

const mapDispatch = {
    fetchWeather: fetchWeatherAction,
};

export default connect(mapState, mapDispatch)(UserPage);
