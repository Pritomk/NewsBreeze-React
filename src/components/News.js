import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);

  const updateNews = () => {
    console.log("Update news")
    setLoading(true)
    window.scroll(0, 0);
    props.setProgress(20);

    // let url = "https://reqres.in/api/users?page=2";

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3c2989530bd0446caca6df3a6518f448&pageSize=${props.pageCount}&page=${page}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setSize(data.totalResults);
        setLoading(false);
        // props.setProgress(100);
        console.log(data);
      });
    props.setProgress(100);
  };

  useEffect(()=> {
    updateNews();
  }, []);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const changeTitle = () => {
    console.log("Change title");
    document.title = `${capitalizeFirstLetter(
      props.category
    )} - NewsBreeze`;
  };

  const fetchMoreData = () => {
    console.log(`${articles.length} ${size}`);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3c2989530bd0446caca6df3a6518f448&pageSize=${props.pageCount}&page=${page+1}`;
    setPage(page+1);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setArticles(articles.concat(data.articles));
        setSize(data.totalResults);
        setLoading(false);
      });
  };

    return (
      <>
        {changeTitle}
        <h2 className="text-center" onClick={updateNews}>
          NewBreeze - Top Headlines{" "}
          {props.category !== "general"
            ? "on " + capitalizeFirstLetter(props.category)
            : ""}
        </h2>
        <div className="text-center">{loading && <Spinner />}</div>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== size}
          loader={
            <div className="text-center">
              <Spinner />
            </div>
          }
        >
          <div className="container">
            <div className="row">
              {!loading &&
                articles.map((item) => {
                  return (
                    <div className="col-md-4 my-4">
                      <NewsItem
                        title={item.title ? item.title.slice(0, 44) : ""}
                        description={
                          item.description ? item.description : "..."
                        }
                        imageUrl={
                          item.urlToImage
                            ? item.urlToImage
                            : "https://img.decrypt.co/insecure/rs:fill:1024:512:1:0/plain/https://cdn.decrypt.co/wp-content/uploads/2022/10/crypto-stocks-economy-gID_5.jpg@png"
                        }
                        author={item.author ? item.author : "unknown"}
                        publishedAt={new Date(item.publishedAt).toGMTString()}
                        source={item.source.name}
                        url={item.url ? item.url : "/"}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageCount: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageCount: PropTypes.number,
  category: PropTypes.string,
};


export default News;