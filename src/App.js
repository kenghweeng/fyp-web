import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import AnalyseView from './views/analyse/AnalyseView';
import FeedView from './views/articles/FeedView';
import ArticleView from './views/articles/ArticleView';


class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container is-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12">
              <Switch>
                <Route path="/" exact component={AnalyseView}/>
                <Route path="/articles" component={FeedView}/>
                <Route path="/article/:id" component={ArticleView}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
