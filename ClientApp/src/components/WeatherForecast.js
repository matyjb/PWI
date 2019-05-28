import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/WeatherForecasts';
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
    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temp. (C)</th>
              <th>Temp. (F)</th>
              <th>Summary</th>
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
          <Button onClick={()=>this.setState({startDateIndex: this.state.startDateIndex-5})}>Previous</Button>
          <Button onClick={()=>this.setState({startDateIndex: this.state.startDateIndex+5})}>Next</Button>
          {this.props.isLoading ? <span>Loading...</span> : []}
        </p>
      </div>
    );
  }
}

export default connect(
  state => state.weatherForecasts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(WeatherForecast);
