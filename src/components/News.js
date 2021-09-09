import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor(){
        super();
        console.log("News Component");
        this.state={
            articles :[],
            loading: false
        }
    }

    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=99252b8d5d48411384b48c62d6447881";
        let data=await fetch(url);

        let parsedData=await data.json();

        console.log(parsedData);
        this.setState({
            articles: parsedData.articles
        })
    }
    render() {
        return (

            
            <div className="container my-3">
                <h2>NewsMonkey - Top Headline</h2>
                <div className="row my-3">
                    { this.state.articles.map((elements)=>{
                        return <div className="col-md-4" key={elements.url}>
                            <NewsItem title={elements.title?elements.title.slice(0,45):" "} description={elements.description?elements.description.slice(0,88):" "} imgUrl={elements.urlToImage} newsUrl={elements.url}/>
                        </div>
                    })}
                
                    
                </div>

                
            </div>
        )
    }
}

export default News
