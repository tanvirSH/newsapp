import React, { Component } from "react";
import Loader from "./Loader";
import NewsItem from "./NewsItem";  
import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroll-component"; // Infinite scroll

export class News extends Component {
  static defaultProps = {
    category: "general",
    country: "us",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      totalPages: 0,
      page: 1,
      pageSize: 9,
      totalResults: 0
    };
    document.title = `${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    } - News World!`;
  }

  fetchData = async () => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedata = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: [...this.state.articles, ...parsedata.articles],
      totalPages: Math.ceil(parsedata.totalResults / this.state.pageSize),
      loading: false,
      totalResults: parsedata.totalResults,
    });
    this.props.setProgress(100);
  };

  handlePrevious = async () => {
    --this.state.page;
    this.fetchData();
  };

  handleNext = async () => {
    ++this.state.page;
    this.fetchData();
  };

  async componentDidMount() {
    console.log("CDM");
    this.fetchData();
  }

  fetchMoreData = () => {
    ++this.state.page;
    this.fetchData();
  };

  render() {
    return (
      <>
        {/* loadder */}
        {this.state.loading && <Loader />}

        {/* content */}
        {(
          <>
            {/* Header section */}
            {!this.state.loading && <div className="container d-flex justify-content-center my-3">
              <h3>
                News World - Top{" "}
                <span className="headlinne-category">
                  {this.props.category}
                </span>{" "}
                Headlines!
              </h3>
            </div>
            }
            {/* next prev button */}
            {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark btn-sm" onClick={this.handlePrevious}>&larr; Prev</button>
          <button disabled={this.state.page >= this.state.totalPages} type="button" className="btn btn-dark btn-sm" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}

            {/* NewsItem component */}
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Loader />}
            >
              <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {this.state.articles.map((element, index) => {
                    return (
                      <div className="col pt-3" key={index}>
                        <NewsItem
                          title={element.title ? element.title : ""}
                          description={
                            element.description ? element.description : ""
                          }
                          imgUrl={element.urlToImage ? element.urlToImage : ""}
                          url={element.url}
                          author={element.author}
                          date={element.publishedAt}
                          source={element.source.name}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </InfiniteScroll>

            {/* next prev button */}
            {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark btn-sm" onClick={this.handlePrevious}>&larr; Prev</button>
          <button disabled={this.state.page >= this.state.totalPages} type="button" className="btn btn-dark btn-sm" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
          </>
        )}
      </>
    );
  }
}

export default News;
