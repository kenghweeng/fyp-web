import React, { Component } from 'react';

import Articles from '../../models/articles';
import ArticleItemsList from './ArticleItemsList'

class FeedView extends Component {
  constructor(props) {
    super(props)
    this.state = {
        articles: [],
        page: 0
    };
  }

  async componentWillMount() {
    const url = new URL(window.location.href);

    let page = 0
    if (url.searchParams.get('p') !== null) {
        page = Number(url.searchParams.get('p'))
    }

    const articles = await Articles.listArticles(page);
    this.setState({
        page: page,
        articles: articles
    });
  }

  async paginationNextOnClick() {
    const newPage = this.state.page + 1;
    const articles = await Articles.listArticles(newPage);
    this.setState({
      articles: articles,
      page: newPage
    });
    this.props.history.push(`/?p=${newPage}`)
  }

  async paginationPrevOnClick() {
    const newPage = this.state.page - 1;
    const articles = await Articles.listArticles(newPage);
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
                  <a
                    className="page-link text-secondary"
                    onClick={this.paginationPrevOnClick}
                  >
                      Previous
                  </a>
              </li>
            :
              null
            }
            <li className="page-item">
              <a
                className="page-link text-secondary"
                onClick={this.paginationNextOnClick}
              >
                  Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  render() {
    const { articles, page } = this.state;
    return (
      <div className="container-fluid">
        <ArticleItemsList
          articles={articles}
          page={page}
        />
        {this.renderPagination()}
      </div>
    );
  }
}

export default FeedView;
