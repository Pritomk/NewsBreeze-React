import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, author, publishedAt, source } =
      this.props;

    return (
      <div>
        <div
          className="card"
          
        >
          <div style={{
            position: "absolute",
            display: "flex",
            justifyContent: "flex-end",
            right: "0",
          }}>
            <span className="badge rounded-pill bg-danger">
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} ...</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                by {author} at {publishedAt}
              </small>
            </p>
            <a
              href={url}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}
