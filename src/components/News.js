import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    
    constructor(){
        super();
        console.log("News Component");
        this.state={
            articles :[],
            loading: false,
            page: 1
        }
    }
    static defaultProps = {
        country: 'us',
        pageSize: 12,
        category: 'general'
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    async updateNews(pageNo){
        console.log(this.state.page);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99252b8d5d48411384b48c62d6447881&page=${pageNo}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});        
        
        let data=await fetch(url);

        let parsedData=await data.json();

        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
            page: pageNo
        })
    }

    async componentDidMount(){
        this.updateNews(1);
    }
    handleNext = async ()=>{
       
        this.updateNews(this.state.page+1);
    }
    handlePrev = async ()=>{
        
        this.updateNews(this.state.page-1);
    }
    render() {
        return (

            
            <div className="container my-3">
                <h1 className="text-center" style={{margin: "30px 0px"}}>NewsMonkey - Top Headline</h1>
                {this.state.loading && <Spinner/>}
                <div className="row my-3">
                    { !this.state.loading && this.state.articles.map((elements)=>{
                        return <div className="col-md-4" key={elements.url}>
                            <NewsItem title={elements.title?elements.title.slice(0,45):" "} description={elements.description?elements.description.slice(0,88):" "} 
                            imgUrl={elements.urlToImage} newsUrl={elements.url} authorName={elements.author} timePublished={elements.publishedAt} source={elements.source.name}/>
                        </div>
                    })}
                
                    
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                    <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>

                </div>
                
            </div>
        )
    }
}

export default News
