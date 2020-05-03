import React, { Component } from 'react'
import _ from 'lodash'

import Tutorial from './Tutorial';
import EvidenceItem from './EvidenceItem'

class AnalyseEvidencePanel extends Component {

  renderQuery() {
    const { analyseResult } = this.props;

    return (
      <div className="">
        <span className="has-text-weight-semibold">Query:</span>
        &nbsp;&nbsp;{analyseResult.query}
      </div>
    );
  }

  renderTrustScore() {
    const { analyseResult } = this.props;
    let totalScore = 0
    let numEntails = 0
    let numContradict = 0

    _.forEach(analyseResult.evidences, (article) => {
      _.forEach(article.entailment, (evidence) => {
        totalScore += Number(evidence.score)
        numEntails += 1
      })
      _.forEach(article.contradiction, (evidence) => {
        totalScore += Number(evidence.score)
        numContradict += 1
      })
    })

    if (numEntails + numContradict === 0) {
      return (
        <div className="text-analyse-result-row">
          <span className="has-text-weight-semibold">Confidence:</span>
          &nbsp;&nbsp;-
        </div>
      );
    }
    let finalScore = Math.ceil(totalScore / (numContradict + numEntails) * 100)

    let color;
    if (finalScore >= 66) {
      color = "has-text-success"
    } else if (finalScore >= 33) {
      color = "has-text-black"
    } else {
      color = "has-text-warning"
    }

    return (
      <div className="text-analyse-result-row">
        <span className="has-text-weight-semibold">Confidence:</span>
        &nbsp;&nbsp;
        <span className={color}>{finalScore}%</span>
      </div>
    );
  }

  renderEntailmentEvidence() {
    const { analyseResult } = this.props;

    const articlesWithEvidence = _.filter(analyseResult.evidences, (article) => {
      return article.entailment.length > 0
    })

    const items = _.map(articlesWithEvidence, (evidence, index) => {
      return (
        <EvidenceItem key={index}
          evidence={evidence.article}
          relatedClaims={evidence.entailment}
        />
      );
    });

    return (
      <div className="columns">
        <p className="column is-2">Supporting:</p>
        <div className="column">{items}</div>
      </div>
    );
  }

  renderContradictionEvidence() {
    const { analyseResult } = this.props;

    const articlesWithEvidence = _.filter(analyseResult.evidences, (article) => {
      return article.contradiction.length > 0
    })

    const items = _.map(articlesWithEvidence, (evidence, index) => {
      return (
        <EvidenceItem key={index}
          evidence={evidence.article}
          relatedClaims={evidence.contradiction}
        />
      );
    });

    return (
      <div className="columns">
        <p className="column is-1">Opposing:</p>
        <div className="column">{items}</div>
      </div>
    );
  }

  render() {
    const { analyseResult } = this.props;

    if (!analyseResult) {
      return null;
    }

    return (
      <div className="text-analyse-result">
        <p className="is-size-4 has-text-weight-semibold"><u>Result</u></p>
        <br />
        {this.renderQuery()}
        <br />
        {this.renderTrustScore()}
        <hr />
        {this.renderEntailmentEvidence()}
        <hr />
        {this.renderContradictionEvidence()}
      </div>
    );
  }
}

export default AnalyseEvidencePanel;
