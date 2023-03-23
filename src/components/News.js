import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false
        }
    }
  async  componentDidMount(){
      
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=99c88c1856734dd38b25da3e60dad1cd&page=1";
        let data= await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        this.setState({articles:parseData.articles})
    }
   handleNextClick=async ()=>{
        console.log("Next");

        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=99c88c1856734dd38b25da3e60dad1cd&page
        =${this.state.page + 1}`;
        let data= await fetch(url);
        let parseData=await data.json()
        console.log(parseData);
    
        this.setState({
            page:this.state.page + 1,
            articles:parseData.articles
        })
    }
     handlePrevClick=async ()=>{
        console.log("Previous");
        
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=99c88c1856734dd38b25da3e60dad1cd&
        page=${this.state.page - 1}`;
        let data= await fetch(url);
        let parseData=await data.json()
        console.log(parseData);
    
        this.setState({
            page:this.state.page - 1,
            articles:parseData.articles})

    }

    render() {
        return (
            <div className="container my-3">
                <h1>NewsApp - Top Headlines</h1>
              
                <div className="row"> 
                {this.state.articles.map((element)=>{
                    console.log(element)
                    return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} 
                    imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
                })}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" class="btn btn-info"onClick={this.handlePrevClick}> &larr; Prev</button>
                <button type="button" class="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>
                    
                    {/* <div className="col-md-4">
                        <NewsItem title="myTitle" description="mydesc"/>
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="myTitle" description="mydesc"/>
                    </div>  */}
                </div> 
            
        )
    }
}

export default News