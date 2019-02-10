import React, { Component } from 'react';

import Articles from '../models/articles';
import ArticleItemsList from '../components/ArticleItemsList'

class FeedView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            page: 0
        };

        this.paginationNextOnClicked = this.paginationNextOnClicked.bind(this)
        this.paginationPrevOnClicked = this.paginationPrevOnClicked.bind(this)
    }

    async componentWillMount() {
        const url = new URL(window.location.href);
    
        let page = 0
        if (url.searchParams.get("p") !== null) {
            page = Number(url.searchParams.get("p"))
        }

        const articles = await Articles.searchAllDocuments(page);
        this.setState({ 
            page: page,
            articles: articles 
        });
    }

    async paginationNextOnClicked() {
        const newPage = this.state.page + 1;
        const articles = await Articles.searchAllDocuments(newPage);
        this.setState({ 
            articles: articles,
            page: newPage
        });
        this.props.history.push(`/?p=${newPage}`)
    }
    
    async paginationPrevOnClicked() {
        const newPage = this.state.page - 1;
        const articles = await Articles.searchAllDocuments(newPage);
        this.setState({ 
            articles: articles,
            page: newPage
        });
        this.props.history.push(`/?p=${newPage}`)
    }

    renderPagination() {
        return (
            <div className="row pagination-row">
                <div className="col-12">
                    <ul className="pagination">
                        {this.state.page > 0 ?
                            <li className="page-item">
                                <a className="page-link text-secondary" onClick={this.paginationPrevOnClicked}>
                                    Previous
                                </a>
                            </li>    
                        :
                            null
                        }
                        <li className="page-item">
                            <a className="page-link text-secondary" onClick={this.paginationNextOnClicked}>
                                Next
                            </a>
                        </li>
                    </ul>    
                </div>
            </div>
        )
    }



    render() {
      return (
        <div className="container-fluid">
            <ArticleItemsList 
                articles={this.state.articles} 
                page={this.state.page} 
            />
            {this.renderPagination()}
        </div>
      );
    }
  }
  
  export default FeedView;
  