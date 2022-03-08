import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      category:'general',
      country:'in'
    }
  }
  render() {
    return (
      <>
        <Navbar/>
        <Routes>
          <Route path='/' element={<News key='home' country={this.state.country} category={'general'}/>} />
          <Route path='/business' element={<News key='business' country={this.state.country} category={'business'}/>} />
          <Route path='/entertainment' element={<News key='entertainment' country={this.state.country} category={'entertainment'}/>} />
          {/* <Route path='/general' element={<News key='general' country={this.state.country} category={'general'}/>} /> */}
          <Route path='/health' element={<News key='health' country={this.state.country} category={'health'}/>} />
          <Route path='/sports' element={<News key='sports' country={this.state.country} category={'sports'}/>} />
          <Route path='/technology' element={<News key='technology' country={this.state.country} category={'technology'}/>} />
        </Routes>
      </>
      
    )
  }
}
