import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroll-component"; // Infinite scroll

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalResults, setTotalResults] = useState(0);

  const fetchData = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    props.setProgress(40);
    let parsedata = await data.json();
    props.setProgress(70);

    setArticles([...articles, ...parsedata.articles]);
    setTotalPages(Math.ceil(parsedata.totalResults / pageSize));
    setLoading(false);
    setTotalResults(parsedata.totalResults);
    props.setProgress(100);
  };

  const fetchMoreData = () => {
    setPage(page+1);
    fetchData();
  };

  useEffect(() => {
    document.title = `${ props.category.charAt(0).toUpperCase() + props.category.slice(1) } - News World!`;
    fetchData();
  }, []);

  return (
    <>
      {/* loadder */}
      {loading && <Loader />}

      {/* content */}
      {
        <>
          {/* Header section */}
          {!loading && (
            <div className="container d-flex justify-content-center my-3">
              <h3>
                News World - Top{" "}
                <span className="headlinne-category">{props.category}</span>{" "}
                Headlines!
              </h3>
            </div>
          )}

          {/* NewsItem component */}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Loader />}
          >
            <div className="container">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {articles.map((element, index) => {
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
        </>
      }
    </>
  );
};

News.defaultProps = {
  category: "general",
  country: "us",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
