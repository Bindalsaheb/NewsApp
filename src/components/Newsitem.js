import React from 'react'

const Newsitem= (props) => {


    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
      <div>
        <div className="card">
          <div style={{ display: 'flex', justifyContent:'flex-end', position: 'absolute', right:'2px' }}>
          <span className="badge rounded-pill bg-danger p-2">
            {source}
          </span>
          </div>

          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body ">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}..</p>
            <small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small>
            <div>
              <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-dark btn-sm my-2">Read More</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default Newsitem