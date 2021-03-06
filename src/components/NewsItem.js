import React from 'react'

const NewsItem = (props)=> {
    
        let {title, description, imgUrl, newsUrl, authorName,timePublished,source}=props;


        return (
            <div className="my-3">

                <div className="card" >
                <div style={{display:"flex", justifyContent:"flex-end" , position: "absolute", right: "0"}}>
                <span className="badge rounded-pill bg-danger" >{source}</span>
                </div>
                    <img src={imgUrl?imgUrl:"https://www.investors.com/wp-content/uploads/2017/05/stock-bull-bear-2-adobe.jpg"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}... </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {authorName?authorName:"Unknown"} on {new Date(timePublished).toGMTString()} </small> </p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem