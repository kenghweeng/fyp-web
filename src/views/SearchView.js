import React, { Component } from 'react';
import Articles from '../models/articles';
import ArticleItemsList from '../components/ArticleItemsList';

class SearchView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchQuery: "",
            articles: []
        }

        this.fetchArticle              = this.fetchArticle.bind(this);
        this.handleSearchQueryChanged  = this.handleSearchQueryChanged.bind(this);
        this.handleSearchButtonClicked = this.handleSearchButtonClicked.bind(this);
    }

    async fetchArticle() {
        return
    }

    handleSearchQueryChanged(event) {
        this.setState({
            searchQuery: event.target.value
        });
    }

    async handleSearchButtonClicked(event) {
        const articles = await Articles.searchDocuments(this.state.searchQuery)
        this.setState({articles: articles})
    }

    renderSearchTextbox() {
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control" 
                value={this.state.searchQuery}
                onChange={this.handleSearchQueryChanged}
                placeholder="Search Query" 
                aria-label="Search query" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" 
                            type="button" onClick={this.handleSearchButtonClicked}>
                        Search
                    </button>
                </div>
            </div>   
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row search-textbox">
                    <div className="col-5">
                        {this.renderSearchTextbox()}        
                    </div>
                </div>
                <ArticleItemsList articles={this.state.articles} page={0} />
                
            </div>
        )
    };
}

export default SearchView;