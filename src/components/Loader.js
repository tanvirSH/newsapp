import React from 'react'
import loaderimg from '../loading.gif'

const Loader = () => {
    return (
      <div className="d-flex justify-content-center">
          <img src={loaderimg} alt="" />
      </div>
    )
}

export default Loader