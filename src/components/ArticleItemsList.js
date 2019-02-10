import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment'

import Articles from '../models/articles';

class ArticleItemsList extends Component {
    
    renderArticleItems() {
        const articleItems = []
        let id = this.props.page * Articles.PAGE_SIZE + 1        
        const currentDate = moment()

        for (let article of this.props.articles) {
            const publishedDate = moment(article._source.publishedDate)
            const item = (
                <div key={article._source.url} className="row article-item">
                    <div className="col-1 article-item-id">
                        <span className="text-secondary">&nbsp;&nbsp;{id}.</span>
                    </div>
                    <div className="col-11">
                    <span>
                        <span>
                            <Link to={`/article/${article._id}`} className="text-decoration-none font-weight-light text-dark"> 
                                {article._source.title} 
                            </Link>
                            &nbsp;
                            <span className="text-lowercase">
                                <a className="text-secondary font-weight-light" target="_blank" href={article._source.url}>
                                    ({article._source.source})
                                </a>
                            </span>
                        </span>
                        <br /> 
                        <span className="text-secondary font-weight-light">
                            {publishedDate.from(currentDate)}
                        </span>
                    </span>
                    </div>  
                </div>
            );
            id = id + 1
            articleItems.push(item);
        }

        return articleItems;
    }

    render() {
        return this.renderArticleItems()
    }
  }
  
  export default ArticleItemsList;
  