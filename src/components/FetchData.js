// @ts-nocheck
/* eslint-disable no-console */
import React, { Component, PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ActionCreators } from '../actions/WeatherForecast'

class FetchData extends Component {
  componentDidMount() {
    if (this.props.pageIndex.startDateIndex === undefined) {
      this.ensureDataFetched()
    }
  }

  componentDidUpdate() {
    if (this.props.pageIndex.startDateIndex !== undefined) {
      this.ensureDataFetched()
    }
  }

  ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0
    const pageIndex = this.props.pageIndex
    if (startDateIndex !== pageIndex.startDateIndex) {
      // console.debug('fetch data')
      this.props.requestWeatherForecasts(startDateIndex, pageIndex.startDateIndex)
    }
  }

  render() {
    // console.debug('render FetchData')
    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {/* {RenderForecastsTable(this.props)} */}
        {/* <RenderForecastsTable forecasts={this.props.forecasts} /> */}
        <ForecastsTable forecasts={this.props.forecasts} />
        <Pagination {...this.props.pageIndex} isLoading={this.props.isLoading} />
      </div>
    )
  }
}

class ForecastsTable extends PureComponent {
  render() {
    // console.debug('xxx')
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {this.props.forecasts.map(forecast => (
            <tr key={forecast.dateFormatted}>
              <td>{forecast.dateFormatted}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
//TODO: to delete - this is a bad example of rerendering
function RenderForecastsTable({ forecasts }) {
  // console.debug('xxx')
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map(forecast => (
          <tr key={forecast.dateFormatted}>
            <td>{forecast.dateFormatted}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

class Pagination extends PureComponent {
  render() {
    // console.debug('render yyy')
    let { startDateIndex, pageSize, totalPage, isLoading } = this.props

    const prevStartDateIndex = (startDateIndex || 0) - pageSize
    const preDisabled = prevStartDateIndex < 0

    const nextStartDateIndex = (startDateIndex || 0) + pageSize
    const nextDisabled = nextStartDateIndex > pageSize * (totalPage - 1)

    return (
      <p className="clearfix text-center">
        {!preDisabled && (
          <Link className="btn btn-default pull-left" to={`/fetch-data/${prevStartDateIndex}`}>
            Previous
          </Link>
        )}
        {!nextDisabled && (
          <Link className="btn btn-default pull-right" to={`/fetch-data/${nextStartDateIndex}`}>
            Next
          </Link>
        )}
        {isLoading ? <span>Loading...</span> : []}
      </p>
    )
  }
}

export default connect(
  state => {
    // console.debug('connect FetchData')
    let newState = state.demo

    return {
      pageIndex: {
        pageSize: 5,
        totalPage: 3,
        startDateIndex: newState.get('startDateIndex')
      },
      forecasts: newState.get('forecasts'),
      isLoading: newState.get('isLoading')
    }
  },
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(FetchData)
