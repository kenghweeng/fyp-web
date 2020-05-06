import React, { Component } from 'react';
import { Link } from "react-router-dom";

import _ from 'lodash';
import moment from 'moment';

import Articles from '../../models/articles';

class FeedView extends Component {
  constructor(props) {
    super(props)
    this.state = {
        articles: [],
        page: 0
    };

    _.bindAll(this, [
      'paginationNextOnClick',
      'paginationPrevOnClick'
    ]);
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
    this.props.history.push(`/articles?p=${newPage}`)
  }

  async paginationPrevOnClick() {
    const newPage = this.state.page - 1;
    const articles = await Articles.listArticles(newPage);
    this.setState({
        articles: articles,
        page: newPage
    });
    this.props.history.push(`/articles?p=${newPage}`)
  }

  renderPagination() {
    return (
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
        : null }
        <li className="page-item">
          <a
            className="page-link text-secondary"
            onClick={this.paginationNextOnClick}
          >
            Next
          </a>
        </li>
      </ul>
    )
  }

  renderArticleItems() {
    const { page, articles } = this.state;

    let id = page * Articles.PAGE_SIZE

    const items = _.map(articles, (article) => {
      const publishedDate = moment(article.publishedDate)
      id = id + 1
      return (
        <div key={article.url} className="columns">
          <div className="column">{id}.</div>
          <div className="column is-11">
            <span>
              <Link to={`/article/${article.id}`}>
              {article.source} || {article.title}
              </Link>
            <br />
            {publishedDate.toDate().toString()}
            </span>
          </div>
        </div>
      );
    });
    return items;
  }


  render() {
    const style = {
      marginBottom: '10em',
    }
    return (
      <div className="container is-fluid" style={style}>
        {this.renderArticleItems()}
        {this.renderPagination()}
      </div>
    );
  }
}

export default FeedView;
