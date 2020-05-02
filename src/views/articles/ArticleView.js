import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactJson from 'react-json-view'
import moment from 'moment'

import Articles from '../../models/articles';

class ArticleView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            article: {},
            selectedParagraph: -1,
            relatedArticles: []
        }

        this.fetchArticle           = this.fetchArticle.bind(this);
        this.fetchRelatedArticles   = this.fetchRelatedArticles.bind(this);
        this.handleParagraphOnClick = this.handleParagraphOnClick.bind(this);
        this.renderArticleContent   = this.renderArticleContent.bind(this);
        this.renderSPOLTComponent   = this.renderSPOLTComponent.bind(this);
    }

    async componentWillMount() {
        const article         = await this.fetchArticle();
        const relatedArticles = await this.fetchRelatedArticles(article._id);
        this.setState({
            article: article,
            relatedArticles: relatedArticles
        });
    }

    async fetchArticle() {
        const article = await Articles.searchArticleById(this.props.match.params.id);
        return article;
    }

    async fetchRelatedArticles(id) {
        const articles = await Articles.searchRelatedArticlesById(id);
        return articles;
    }

    handleParagraphOnClick = async (event) => {
        const paragraphIndex = Number(event.target.getAttribute("data-index"));
        const newSelectedParagraph = paragraphIndex === this.state.selectedParagraph ? -1 : paragraphIndex;

        let relatedArticles = []
        if (newSelectedParagraph === -1) {
            // display general related articles
            relatedArticles = await this.fetchRelatedArticles(this.state.article._id);
        } else {
            // display sentence related articles
            const sentence = event.target.textContent;
            relatedArticles = await Articles.searchRelatedArticlesBySentence(sentence)
        }

        this.setState({
            relatedArticles: relatedArticles,
            selectedParagraph: newSelectedParagraph
        })
    }

    renderArticleContent() {
        if (this.state.article.content === undefined) {
            return
        }

        const paragraphs = this.state.article.content.split("\n");
        return paragraphs.map((paragraph, index) => {
            let spanClassname = "text-justify article-paragraph-span"
            if (index === this.state.selectedParagraph) {
                spanClassname = spanClassname + " article-paragraph-span-selected"
            }
            return (
                <p  key={index}>
                    <span className={spanClassname}
                        onClick={this.handleParagraphOnClick}
                        data-index={index}>
                        {paragraph}
                    </span>
                </p>

            );
        })
    }

    renderRelatedArticles() {
        const relatedArticlesCards = []
        const currentDate = moment()

        this.state.relatedArticles.forEach(article => {
            const publishedDate = moment(article.publishedDate)
            const render = (
                <a key={article._id} target="_blank" href={`/article/${article._id}`} className="text-decoration-none">
                    <div key={article._id} className="card related-articles-card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted text-dark">{article.title}</h6>
                            <p className="card-text text-dark">{article.content.substring(0, 100)}...</p>
                        </div>
                        <div className="card-footer text-muted">
                            {publishedDate.from(currentDate)} - Distance: {article.dist}
                        </div>
                    </div>
                </a>

            )
            relatedArticlesCards.push(render)
        })

        return (
            <div>
                <h3>Related Articles</h3>
                <div className="card-columns">
                {relatedArticlesCards.length > 0 ? relatedArticlesCards : <div>No related articles found.</div>}
                </div>
            </div>
        )
    }


    renderSPOLTComponent() {
        const renderJSONViewShouldCollapse = (field) => {
            if (field.name === "root") {
                return false
            }
            if (field.name === "entities") {
                return false
            }
        }
        return (
            <ReactJson src={this.state.article.nlp}
                theme="monokai"
                displayDataTypes={false}
                enableClipboard={false}
                shouldCollapse={renderJSONViewShouldCollapse}
            />
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-5">
                        <h3>
                            {this.state.article.title}
                        </h3>
                        <img className="img-fluid rounded mx-auto d-block" src={this.state.article.imageurl} />
                        <p>
                            <strong>Published Date:</strong> {this.state.article.publishedDate} &nbsp;&nbsp;&nbsp;
                        </p>
                        <p>
                            <strong>Author:</strong> {this.state.article.author}
                        </p>
                        <p>
                            <strong>Original Source:&nbsp;&nbsp;</strong>
                            <a className="text-lowercase" target="_blank" href={this.state.article.url}>
                                {this.state.article.source}
                            </a>
                        </p>
                        <p></p>
                        {this.renderArticleContent()}

                    </div>
                    <div className="col-12 col-md-12 col-lg-6">
                        {this.renderRelatedArticles()}
                    </div>
                </div>
            </div>
        )
    };
}

export default ArticleView;