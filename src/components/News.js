import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageCount: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageCount: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      size: 0,
    };
  }

  updateNews = () => {
    this.setState({ loading: true });
    window.scroll(0, 0);
    this.props.setProgress(20);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c2989530bd0446caca6df3a6518f448&pageSize=${this.props.pageCount}&page=${this.state.page}`;
    fetch(url)
      .then((res) => {
        this.props.setProgress(60);
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          size: data.totalResults,
          loading: false,
        });
        this.props.setProgress(100);
      });
  };

  componentDidMount() {
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c2989530bd0446caca6df3a6518f448&pageSize=${this.props.pageCount}`;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     this.setState({
    //       articles: data.articles,
    //       size: data.totalResults,
    //       loading: false,
    //     });
    //   });
    this.updateNews();
  }

  handlePrevClick = () => {
    console.log(this.state.page);
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
    // window.scroll(0, 0);

    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=3c2989530bd0446caca6df3a6518f448&pageSize=${
    //   this.props.pageCount
    // }&page=${this.state.page}`;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.setState({
    //       articles: data.articles,
    //       loading: false,
    //     });
    //   });
  };

  handleNextClick = () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
    // window.scroll(0, 0);

    // console.log(this.state.page);
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=3c2989530bd0446caca6df3a6518f448&pageSize=${
    //   this.props.pageCount
    // }&page=${this.state.page}`;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.setState({
    //       articles: data.articles,
    //       loading: false,
    //     });
    //   });
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  changeTitle = () => {
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsBreeze`;
  };

  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c2989530bd0446caca6df3a6518f448&pageSize=${this.props.pageCount}&page=${this.state.page}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          articles: this.state.articles.concat(data.articles),
          size: data.totalResults,
          loading: false,
        });
        console.log(data);
        console.log("Article length "+this.state.articles.length+" size"+this.state.size);
      });
  };

  render() {
    return (
      <>
        <this.changeTitle />
        <h2 className="text-center">
          NewBreeze - Top Headlines{" "}
          {this.props.category !== "general"
            ? "on " + this.capitalizeFirstLetter(this.props.category)
            : ""}
        </h2>
        <div className="text-center">{this.state.loading && <Spinner />}</div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length-this.props.pageCount !== this.state.size}
          loader={
            <div className="text-center">
              <Spinner />
            </div>
          }
        >
          <div className="container">
            <div className="row">
              {!this.state.loading &&
                this.state.articles.map((item) => {
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
        {/* <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
            disabled={this.state.page * 21 > this.state.size}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
