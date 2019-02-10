import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import "./styles/App.css"

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FeedView from './views/FeedView';
import ArticleView from './views/ArticleView';
import SearchView from './views/SearchView'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
          <div className="row">
              <div className="col-0 col-sm-0 col-md-1"></div>
              <div className="col-12 col-sm-12 col-md-10">
                  <Navbar />
              </div>
          </div>

          <div className="row">
            <div className="col-0 col-sm-0 col-md-1"></div>
            <div className="col-12 col-sm-12 col-md-10">
              <Switch>
                <Route path="/" exact component={FeedView}/>
                <Route path="/article/:id" component={ArticleView}/>
                <Route path="/search" component={SearchView}/>
              </Switch>
            </div>
          </div>
          <div className="row">
            <div className="col-0 col-sm-0 col-md-1"></div>
            <div className="col-12 col-sm-12 col-md-10">
              <Footer />
            </div>
          </div>
      </div>
      
    );
  }
}

export default App;
