import React, { Component } from 'react';
import _ from 'lodash';

import Articles from '../../models/articles';

class ArticleView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      article: {},
    }
  }

  async componentWillMount() {
    const article = await this.fetchArticle();
    console.log(article)
    this.setState({ article: article });
  }

  async fetchArticle() {
    const { match } = this.props;
    const id = match.params.id
    const article = await Articles.retrieveArticle(id);
    return article;
  }

  renderArticleContent() {
    const { article } = this.state;
    if (article.content === undefined) {
      return;
    }

    let paragraphs = article.content.split("\n");
    paragraphs = _.filter(paragraphs, (para) => {
      return para.length > 0;
    })
    return _.map(paragraphs, (paragraph, idx) => {
      return (
        <p className="has-text-justified" key={idx}>{paragraph}<br/><br/></p>
      );
    });
  }

  render() {
    const { article } = this.state;

    if (!article) {
      return null;
    }

    return (
      <div className="columns">
        <div className="column is-6 is-offset-3">
        <h3 className="is-size-4 has-text-weight-semibold">{article.title}</h3>
        <br />
        <img className="image" src={article.imageurl} />
        <p>
          <strong>Published Date:</strong> {article.publishedDate}
        </p>
        <p>
          <strong>Author:</strong> {article.author}
        </p>
        <p>
          <strong>Original Source:&nbsp;&nbsp;</strong>
          <a className="text-lowercase" target="_blank" href={article.url}>
            {this.state.article.source}
          </a>
        </p>
        <br />
        {this.renderArticleContent()}
        </div>

      </div>
    )
  };
}

export default ArticleView;