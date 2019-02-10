import React, { Component } from 'react';
import Articles from '../models/articles';

class ArticleView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            article: {}
            
        }

        this.fetchArticle = this.fetchArticle.bind(this);
        this.renderArticleContent = this.renderArticleContent.bind(this);
    }

    componentWillMount() {
        this.fetchArticle()
    }

    async fetchArticle() {
        const article = await Articles.searchArticleById(this.props.match.params.id)
        this.setState({ article: article._source })
    }

    renderArticleContent() {
        if (this.state.article.content === undefined) {
            return
        }

        const paragraphs = this.state.article.content.split("\n");
        return paragraphs.map((paragraph, index) => {
            return <p className="text-justify" key={index}>{paragraph}</p>
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7">
                        <h3 className="display-4">
                            {this.state.article.title}
                        </h3>
                        <img className="img-fluid" src={this.state.article.imageurl} />
                        <p>
                            <strong>Published Date:</strong> {this.state.article.publishedDate} &nbsp;&nbsp;&nbsp;
                            <strong>Author:</strong> {this.state.article.author}
                        </p>
                        <p>
                            <strong>Original Source:</strong> {this.state.article.url}
                        </p>
                        <p></p>
                        {this.renderArticleContent()}
                    </div>
                </div>
            </div>
        )
    };
}

export default ArticleView;