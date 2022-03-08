import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state ={
      articles: [],
      loading: false,
      totalPages: 0,
      page:1,
      pageSize:9
    }
  }

  fetchData = async () => {
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=49b12ba480594baa99a5b73605aa6b8e&page=${this.state.page}&pageSize=${this.state.pageSize} `);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({articles: parsedata.articles, totalPages: Math.ceil(parsedata.totalResults/this.state.pageSize)});

  }

  async componentDidMount() {
    console.log('CDM');
    this.fetchData();
  }

  handlePrevious = async () => {
    console.log(this.state.page);
    this.setState({page: this.state.page - 1});
    this.fetchData();
  };

  handleNext = async () => {
    console.log(this.state.page);
    this.setState({page: this.state.page + 1});
    this.fetchData();
  };

  render() {
    return (
      <div className="container my-3">
        <h3>News World</h3>
        <div className="row">
          {this.state.articles.map((element, index) =>{
            return (<div className="col-md-4 my-3" key={index}>
              <NewsItem  title={element.title? element.title: ''} description={element.description? element.description:''} imgUrl={element.urlToImage? element.urlToImage:''} url={element.url}/>
          </div> )
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Prev</button>
          <button disabled={this.state.page >= this.state.totalPages} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
