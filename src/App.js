import "./App.css";

import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar"; //Top loading bar

import Navbar from "./components/Navbar";
import News from "./components/News";

const App = () => {
  const [category, setCategory] = useState('general');
  const [country, setCountry] = useState('in');
  const [progressBar, setProgressBar] = useState(0);
  const apiKey = process.env.REACT_APP_NEWS_API;
  
  const setProgress = (progress) => {
    setProgressBar({ progressBar: progress });
  };

    return (
      <>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={progressBar} />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress} 
                apiKey={apiKey}
                key="home"
                country={country}
                category={"general"}
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                setProgress={setProgress} 
                apiKey={apiKey}
                key="business"
                country={country}
                category={"business"}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={setProgress} 
                apiKey={apiKey}
                key="entertainment"
                country={country}
                category={"entertainment"}
              />
            }
          />
          {/* <Route path='/general' element={<News  setProgress={ setProgress }  key='general' country={country} category={'general'}/>} /> */}
          <Route
            path="/health"
            element={
              <News
                setProgress={setProgress} 
                apiKey={apiKey}
                key="health"
                country={country}
                category={"health"}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                setProgress={setProgress} 
                apiKey={apiKey}
                key="sports"
                country={country}
                category={"sports"}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                setProgress={setProgress} 
                apiKey={apiKey}
                key="technology"
                country={country}
                category={"technology"}
              />
            }
          />
        </Routes>
      </>
    );
}

export default App;
