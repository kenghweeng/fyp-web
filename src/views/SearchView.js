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

        this.fetchArticles               = this.fetchArticles.bind(this);
        this.handleSearchQueryKeyPressed = this.handleSearchQueryKeyPressed.bind(this);
        this.handleSearchQueryChanged    = this.handleSearchQueryChanged.bind(this);
        this.handleSearchButtonClicked   = this.handleSearchButtonClicked.bind(this);
    }

    async componentWillMount() {
        const url = new URL(window.location.href);
    
        let searchQuery = null
        if (url.searchParams.get("q") !== null) {
            searchQuery = url.searchParams.get("q")
        }

        if (searchQuery !== null) {
            this.setState({
                searchQuery: searchQuery
            })
            const articles = await this.fetchArticles(searchQuery)
            this.setState({articles: articles})
        }
    }

    async fetchArticles(query) {
        return await Articles.searchArticles(query)
    }

    handleSearchQueryChanged(event) {
        this.setState({
            searchQuery: event.target.value
        });
    }

    async handleSearchQueryKeyPressed(event) {
        if(event.key == 'Enter'){
            await this.handleSearchButtonClicked()
        }
    }

    async handleSearchButtonClicked(event) {
        const articles = await this.fetchArticles(this.state.searchQuery)
        this.setState({articles: articles})
        this.props.history.push(`/search/?q=${this.state.searchQuery}`)
    }

    renderSearchTextbox() {
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control" 
                value={this.state.searchQuery}
                onChange={this.handleSearchQueryChanged}
                onKeyPress={this.handleSearchQueryKeyPressed}
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
                    <div className="col-12">
                        {this.renderSearchTextbox()}        
                    </div>
                </div>
                <ArticleItemsList articles={this.state.articles} page={0} />
                
            </div>
        )
    };
}

export default SearchView;