import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, url, author, date, source } = this.props;
    return (
      <div>
        <div className="card">
          <a href={url} target="_blank" rel="noreferrer">
            <img src={imgUrl} className="card-img-top" alt="..." />
          </a>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span 
              class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" 
              style={{left:'90%', zIndex:'1'}}>
              {source}
            </span>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a
              href={url}
              rel="noreferrer"
              target="_blank"
              className="btn btn-dark btn-sm"
            >
              Detail
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
