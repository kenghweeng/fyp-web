import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import "./styles/App.css"

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainView from './views/MainView';
import FeedbackView from './views/FeedbackView'
import AboutView from './views/AboutView'


import FeedView from './views/FeedView';
import ArticleView from './views/ArticleView';
import SearchView from './views/SearchView'
import AnalyseView from './views/AnalyseView'

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12">
            <Switch>
                <Route path="/" exact component={MainView}/>
                <Route path="/about" component={AboutView}/>
                <Route path="/feedback" component={FeedbackView}/>


                <Route path="/feed" component={FeedView}/>
                <Route path="/article/:id" component={ArticleView}/>
                <Route path="/search" component={SearchView}/>
                <Route path="/analyse" component={AnalyseView}/>
              </Switch>
            </div>
          </div> 
        </div>  
        <Footer />
      </div>
    );
  }
}

export default App;
