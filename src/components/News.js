import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    
    constructor(props){
        super(props);
        console.log("News Component");
        this.state={
            articles :[],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title= `${this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} - NewsMonkey`;
    }
    static defaultProps = {
        country: 'us',
        pageSize: 12,
        category: 'general',
        setProgress: 0
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        setProgress: PropTypes.number
    }

    fetchMoreData = async() => {
        console.log(this.state.page);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        
        let data=await fetch(url);

        let parsedData=await data.json();

        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
            page: this.state.page+1
        })
    };

    async componentDidMount(){
        this.props.setProgress(10);
        console.log(this.state.page);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});        
        
        let data=await fetch(url);
        this.props.setProgress(50);

        let parsedData=await data.json();
        this.props.setProgress(10);

        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
            page: 1
        });
        this.props.setProgress(100);
    }
    
    render() {
        return (

            
            <div className="container my-3">
                <h1 className="text-center" style={{margin: "30px 0px"}}>NewsMonkey - Top {this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} Headline</h1>
                {this.state.loading && <Spinner/>}

                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<h4><Spinner/></h4>}>
                <div className="container">
                    <div className="row mx-3 my-3">
                        {this.state.articles.map((elements)=>{
                            return <div className="col-md-4" key={elements.url}>
                                <NewsItem title={elements.title?elements.title.slice(0,45):" "} description={elements.description?elements.description.slice(0,88):" "} 
                                imgUrl={elements.urlToImage} newsUrl={elements.url} authorName={elements.author} timePublished={elements.publishedAt} source={elements.source.name}/>
                            </div>
                        })}
                    
                        
                    </div>
                </div>
                </InfiniteScroll>
                
                
            </div>
        )
    }
}

export default News
