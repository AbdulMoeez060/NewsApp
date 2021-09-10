import React, { Component } from 'react'

export class NewsItem extends Component {
    
    constructor(){
        super();
        console.log("NewsItem Component");
    }
    render() {
        let {title, description, imgUrl, newsUrl}=this.props;


        return (
            <div className="my-3">
                <div className="card" >
                    <img src={imgUrl?imgUrl:"https://www.investors.com/wp-content/uploads/2017/05/stock-bull-bear-2-adobe.jpg"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem