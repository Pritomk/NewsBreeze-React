import React, { Component } from 'react'
import loading from './Spinner-2.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={loading} alt="Loading" />
      </div>
    )
  }
}
