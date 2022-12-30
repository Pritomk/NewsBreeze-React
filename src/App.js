import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = ()=> {
  // business
  // entertainment
  // general
  // health
  // science
  // sports
  // technology

  const pageCount = 15;
  const [progress, setProgress] = useState(0);

  const Routing = () => {
    return (
      <Routes>
        <Route
          exact
          path="/"
          element={
            <News
              setProgress={setProgress}
              pageCount={pageCount}
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
              setProgress={setProgress}
              pageCount={pageCount}
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
              setProgress={setProgress}
              pageCount={pageCount}
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
              setProgress={setProgress}
              pageCount={pageCount}
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
              setProgress={setProgress}
              pageCount={pageCount}
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
              setProgress={setProgress}
              pageCount={pageCount}
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
              setProgress={setProgress}
              pageCount={pageCount}
              key="entertainment"
              country="in"
              category="entertainment"
            />
          }
        ></Route>
      </Routes>
    );
  };

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={progress} />
          <Routing/>
        </Router>
      </div>
    );
}

export default App;