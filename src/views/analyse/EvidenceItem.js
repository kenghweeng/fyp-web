import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash';

const ARTICLE_SOURCE_MAP = {
  "Channelnewsasia.com": 1,
  "todayonline.com": 2,
  "Straitstimes.com": 3,
};

const ARTICLE_SOURCE_ICON = {
  1: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Channel_NewsAsia_logo_(shape_only).svg/1200px-Channel_NewsAsia_logo_(shape_only).svg.png",
  2: "https://www.todayonline.com/sites/all/themes/weekend/templates/static/img/TodayOnline-icon.1bf9bb3.png",
  3: "https://pbs.twimg.com/profile_images/630988935720648704/HkmsHBTM_400x400.jpg",
  4: "https://corp.scmp.com/wp-content/uploads/2018/02/SCMP_logo_03.png"
}


class EvidenceItem extends Component {
  renderRelatedClaims() {
    const { relatedClaims } = this.props;

    return _.map(relatedClaims, (claim, idx) => {
      return (<p key={idx} className="">[{claim.score}]{claim.sentence}</p>);
    });
  }

  render() {
    const { evidence } = this.props;

    const articleSourceImageURL = ARTICLE_SOURCE_ICON[ARTICLE_SOURCE_MAP[evidence.source]];
    const publishedDate = moment(evidence.publishedDate).fromNow()
    return (
      <article>
        <a
          className="evidence-item-title"
          href={evidence.url}
          target="_blank"
        >
          <img width="20px" height="20px" src={articleSourceImageURL} />
          &nbsp;&nbsp;
          {evidence.title}
        </a>
        <p className="evidence-item-time">{publishedDate}</p>
        {this.renderRelatedClaims()}
      </article>
    );
  }
}

export default EvidenceItem;