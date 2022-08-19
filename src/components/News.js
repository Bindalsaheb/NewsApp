import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalize = (letter) => {
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  }


const updateNews = async () => {
  props.setProgress(10);

  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

  setLoading(true);
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json();
  props.setProgress(70);
  setLoading(false);

  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);

  props.setProgress(100);
}

useEffect(() => {
  updateNews();
    document.title = capitalize(props.category);

}, [])


const handlPreviousClick = async () => {
  setPage(page - 1);
  updateNews();

}
const handleNextClick = async () => {
  setPage(page + 1);
  updateNews();
}

const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  setPage(page + 1)
  setLoading(true);

  let data = await fetch(url);
  let parsedData = await data.json();

  setArticles(articles.concat(parsedData.articles));
  setTotalResults(parsedData.totalResults);
  setLoading(false);
};

return(
<>
  <h2 className='text-center' style={{marginTop:'80px', marginBottom:'20px'}}>{capitalize(props.category)} News Headlines</h2>
  {loading && <Spinner />}
  <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    hasMore={articles.length !== totalResults}
    loader={loading ? <Spinner /> : ""}
  >

    <div className="container">
      <div className="row">
        {articles.map((element) => {
          return <div className="col-sm-12 col-md-14 col-lg-4 mb-3" key={element.url}>
            <Newsitem key={element.source.id} source={element.source.name} author={element.author} date={element.publishedAt} title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://media.news9live.com/h-upload/2022/06/17/433422-mit-solar-neighbor-01-press011.jpg"} newsUrl={element.url} />
          </div>
        })}
      </div>
    </div>

  </InfiniteScroll>
  <div className="container d-flex justify-content-between my-3">
    <button type='button' disabled={page <= 1} className='btn btn-dark' onClick={handlPreviousClick}>Previous</button>
    {/* <button type='button' disabled={articles.length < .totalResults} className='btn btn-dark' onClick={handlPreviousClick}>Previous</button> */}
    <button type='button' disabled={page >= Math.ceil(totalResults / props.pageSize)} className='btn btn-dark' onClick={handleNextClick}>Next</button>
  </div>
</>
)
}

News.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News