import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/Counter'

const countStyle = {
  display: 'inline-block',
  padding: '0 10px',
  fontWeight: '600'
}

const Counter = props => (
  <>
    <h1>Counter</h1>
    <p>This is a simple example of a React component.</p>
    <button className="btn btn-primary" onClick={props.increaseAsync}>
      ++
    </button>
    &nbsp;
    <button className="btn btn-primary" onClick={props.increase}>
      +
    </button>
    <span style={countStyle}>{props.value}</span>
    <button className="btn btn-primary" onClick={props.decrease}>
      -
    </button>
  </>
)

export default connect(
  state => {
    return {
      value: state.counter.get('value')
    }
  },
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(Counter)
