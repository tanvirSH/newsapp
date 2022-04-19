import React, { Component } from 'react'
import loaderimg from '../loading.gif'

export class Loader extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
          <img src={loaderimg} alt="" />
      </div>
    )
  }
}

export default Loader