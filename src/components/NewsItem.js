import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, url} = this.props;
    return (
      <div>
        <div className="card">
          <a href={url} target="_blank" rel="noreferrer">
            <img src={imgUrl} className="card-img-top" alt="..." />
          </a>
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href={url} rel="noreferrer" target="_blank" className="btn btn-primary btn-sm">Detail</a>
          </div>
          </div>    
      </div>
    )
  }
}

export default NewsItem
