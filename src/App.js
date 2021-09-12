import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize=18;
  apikey=process.env.REACT_APP_NEWS_API;

  state = {
    progress:0
  };

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
        // onLoaderFinished={() => setProgress(0)}
        />
          <Navbar/>
        
          
          <Switch>
          <Route exact path="/"><News apiKey={this.apikey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="us" category="general"/></Route>
          <Route exact path="/business"><News apiKey={this.apikey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="us" category="business"/></Route>
          <Route exact path="/entertainment"><News apiKey={this.apikey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/></Route>
          <Route exact path="/general"><News apiKey={this.apikey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="us" category="general"/></Route>
          <Route exact path="/health"><News apiKey={this.apikey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="us" category="health"/></Route>
          <Route exact path="/science"><News apiKey={this.apikey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="us" category="science"/></Route>
          <Route exact path="/sports"><News apiKey={this.apikey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="us" category="sports"/></Route>
          <Route exact path="/technology"><News apiKey={this.apikey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="us" category="technology"/></Route>
          </Switch>
        </Router>

      </div>
    )
  }
}
