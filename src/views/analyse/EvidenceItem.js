import React, { Component } from 'react';
import moment from 'moment'

import Articles from "../../models/articles";

const ARTICLE_SOURCE_ICON = {
  1: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Channel_NewsAsia_logo_(shape_only).svg/1200px-Channel_NewsAsia_logo_(shape_only).svg.png",
  2: "https://www.todayonline.com/sites/all/themes/weekend/templates/static/img/TodayOnline-icon.1bf9bb3.png",
  3: "https://www.unwomen.org.sg/wp-content/uploads/2018/04/Straits-Times-Logo.jpg",
  4: "https://corp.scmp.com/wp-content/uploads/2018/02/SCMP_logo_03.png"
}

const ARTICLE_SOURCE_NAME = {
  1: "Channel NewsAsia",
  2: "Today Online",
  3: "The Straits Times",
  4: "South China Morning Post"
}

class EvidenceItem extends Component {
  renderRelatedClaims() {
    const claims = []
    for (const [index, claim] of this.props.relatedClaims.entries()) {
        claims.push(<p key={index} className="evidence-item-sentence">{claim.sentence}</p>)
    }
    return claims;
  }

  render() {
    const articleSourceImageURL = ARTICLE_SOURCE_ICON[Articles.ARTICLE_SOURCE_MAP[this.props.evidence.source]];
    const articleSourceName = ARTICLE_SOURCE_NAME[Articles.ARTICLE_SOURCE_MAP[this.props.evidence.source]];
    const publishedDate = moment(this.props.evidence.publishedDate).fromNow()

    return (
      <article className="evidence-item">
        <div className="evidence-item-source">
            <img width="20px" height="20px" src={articleSourceImageURL} />
            <span>{articleSourceName}</span>
        </div>
        <a className="evidence-item-title" href={this.props.evidence.url} target="_blank">{this.props.evidence.title}</a>
        <p className="evidence-item-time">{publishedDate}</p>

        {this.renderRelatedClaims()}
      </article>
    );
  }
}

export default EvidenceItem;