import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  // business
  // entertainment
  // general
  // health
  // science
  // sports
  // technology

  pageCount = 15;

  Routing = () => {
    return (
      <Routes>
        <Route
          exact
          path="/"
          element={
            <News
              setProgress={this.setProgress}
              pageCount={this.pageCount}
              key="general"
              country="in"
              category="general"
            />
          }
        ></Route>
        <Route
          exact
          path="/business"
          element={
            <News
              setProgress={this.setProgress}
              pageCount={this.pageCount}
              key="business"
              country="in"
              category="business"
            />
          }
        ></Route>
        <Route
          exact
          path="/technology"
          element={
            <News
              setProgress={this.setProgress}
              pageCount={this.pageCount}
              key="technology"
              country="in"
              category="technology"
            />
          }
        ></Route>
        <Route
          exact
          path="/health"
          element={
            <News
              setProgress={this.setProgress}
              pageCount={this.pageCount}
              key="health"
              country="in"
              category="health"
            />
          }
        ></Route>
        <Route
          exact
          path="/science"
          element={
            <News
              setProgress={this.setProgress}
              pageCount={this.pageCount}
              key="science"
              country="in"
              category="science"
            />
          }
        ></Route>
        <Route
          exact
          path="/sports"
          element={
            <News
              setProgress={this.setProgress}
              pageCount={this.pageCount}
              key="sports"
              country="in"
              category="sports"
            />
          }
        ></Route>
        <Route
          exact
          path="/entertainment"
          element={
            <News
              setProgress={this.setProgress}
              pageCount={this.pageCount}
              key="entertainment"
              country="in"
              category="entertainment"
            />
          }
        ></Route>
      </Routes>
    );
  };

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <this.Routing />
        </Router>
      </div>
    );
  }
}
