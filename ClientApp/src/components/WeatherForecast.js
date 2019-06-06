import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/WeatherForecasts';
import { translate } from 'react-multi-lang';
import {Button} from "@material-ui/core";

class WeatherForecast extends Component {
  state = {
    startDateIndex: -1,
  }
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  componentDidUpdate() {
    // This method is called when the route parameters change
    this.ensureDataFetched();
  }

  ensureDataFetched() {
    this.props.requestWeatherForecasts(this.state.startDateIndex);
  }

  render() {
    const {t} = this.props;
    return (
      <div>
        <h1>{t("weatherForecasts.title")}</h1>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>{t("weatherForecasts.date")}</th>
              <th>{t("weatherForecasts.temperature")} (C)</th>
              <th>{t("weatherForecasts.temperature")} (F)</th>
              <th>{t("weatherForecasts.summary")}</th>
            </tr>
          </thead>
          <tbody>
            {this.props.forecasts.map(forecast =>
              <tr key={forecast.dateFormatted}>
                <td>{forecast.dateFormatted}</td>
                <td>{forecast.temperatureC}</td>
                <td>{forecast.temperatureF}</td>
                <td>{forecast.summary}</td>
              </tr>
            )}
          </tbody>
        </table>
        <p className='clearfix text-center'>
          <Button onClick={()=>this.setState({startDateIndex: this.state.startDateIndex-5})}>{t("weatherForecasts.previous")}</Button>
          <Button onClick={()=>this.setState({startDateIndex: this.state.startDateIndex+5})}>{t("weatherForecasts.next")}</Button>
          {this.props.isLoading ? <span>{t("weatherForecasts.loading")}...</span> : []}
        </p>
      </div>
    );
  }
}

export default connect(
  state => state.weatherForecasts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(translate(WeatherForecast));
