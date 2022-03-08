import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';


export class News extends Component {

  static defaultProps = {
    category: 'general',
    country: 'us'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state ={
      articles: [],
      loading: true,
      totalPages: 0,
      page:1,
      pageSize:9
    }
  }

  fetchData = async () => {
    let data = await fetch(`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=49b12ba480594baa99a5b73605aa6b8e&page=${this.state.page}&pageSize=${this.state.pageSize} `);
    let parsedata = await data.json();
    this.setState({articles: parsedata.articles, totalPages: Math.ceil(parsedata.totalResults/this.state.pageSize), loading: false});

  }

  async componentDidMount() {
    console.log('CDM');
    this.fetchData();
  }

  handlePrevious = async () => {
    console.log(this.state.page);
    this.setState({page: this.state.page - 1});
    await this.fetchData();
  };

  handleNext = async () => {
    console.log(this.state.page);
    this.setState({page: this.state.page + 1});
    await this.fetchData();
  };

  render() {
    return (
      <div className="container my-3">
        { this.state.loading && <Loader />}
        { !this.state.loading &&
        (<>
        <div className="container d-flex justify-content-center">
        <h3>News World - Top Headlines - {this.props.category}</h3>
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark btn-sm" onClick={this.handlePrevious}>&larr; Prev</button>
          <button disabled={this.state.page >= this.state.totalPages} type="button" className="btn btn-dark btn-sm" onClick={this.handleNext}>Next &rarr;</button>
        </div>
        <div className="row">
          {this.state.articles.map((element, index) =>{
            return (<div className="col-md-4 my-3" key={index}>
              <NewsItem  title={element.title? element.title: ''} description={element.description? element.description:''} imgUrl={element.urlToImage? element.urlToImage:''} url={element.url}/>
          </div> )
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark btn-sm" onClick={this.handlePrevious}>&larr; Prev</button>
          <button disabled={this.state.page >= this.state.totalPages} type="button" className="btn btn-dark btn-sm" onClick={this.handleNext}>Next &rarr;</button>
        </div>
        </>
    )}
      </div>
    )
  }
}

export default News
