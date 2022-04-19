import "./App.css";

import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar"; //Top loading bar

import Navbar from "./components/Navbar";
import News from "./components/News";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      category: "general",
      country: "in",
      progress: 0,
    };
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  }
  render() {
    return (
      <>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={this.state.progress} />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={this.setProgress}
                key="home"
                country={this.state.country}
                category={"general"}
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                setProgress={this.setProgress}
                key="business"
                country={this.state.country}
                category={"business"}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={this.setProgress}
                key="entertainment"
                country={this.state.country}
                category={"entertainment"}
              />
            }
          />
          {/* <Route path='/general' element={<News  setProgress={ setProgress }  key='general' country={this.state.country} category={'general'}/>} /> */}
          <Route
            path="/health"
            element={
              <News
                setProgress={this.setProgress}
                key="health"
                country={this.state.country}
                category={"health"}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                setProgress={this.setProgress}
                key="sports"
                country={this.state.country}
                category={"sports"}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                setProgress={this.setProgress}
                key="technology"
                country={this.state.country}
                category={"technology"}
              />
            }
          />
        </Routes>
      </>
    );
  }
}
