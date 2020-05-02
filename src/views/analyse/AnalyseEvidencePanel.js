import React, { Component } from 'react'
import _ from 'lodash'

import Tutorial from './Tutorial';
import EvidenceItem from './EvidenceItem'

class AnalyseEvidencePanel extends Component {

  renderQuery() {
    const { analyseResult } = this.props;

    return (
      <div className="text-analyse-result-row">
          <span className="text-analyse-result-query-label">Query:</span>
          <span className="text-analyse-result-query-content">{analyseResult.query} </span>
      </div>
    );
  }

  renderTrustScore() {
    const { analyseResult } = this.props;

    let totalScore = 0
    let numEntails = 0
    let numNeutral = 0
    let numContradict = 0

    for (const article of analyseResult.articlesWithEvidence) {
      for (const evidence of article.evidence.entailment) {
        totalScore += evidence.score[0]
        numEntails += 1
      }

      for (const evidence of article.evidence.contradiction) {
        totalScore += evidence.score[1]
        numContradict += 1
      }
    }

    let finalScore = Math.ceil(totalScore / (numContradict + numEntails + numNeutral) * 100)

    let trustScoreColor;
    if (finalScore >= 66) {
        trustScoreColor = "green"
    } else if (finalScore >= 33) {
        trustScoreColor = "black"
    } else {
        trustScoreColor = "red"
    }

    const trustScoreStyle = {
        color: trustScoreColor
    }

    return (
      <div className="text-analyse-result-row">
        <span className="text-analyse-result-query-label">Confidence:</span>
        <span
          className="text-analyse-result-query-content"
          style={trustScoreStyle}
        >
          {finalScore}%
        </span>
      </div>
    );
  }

  renderEntailmentEvidence() {
    const { analyseResult } = this.props;

    const articlesWithEvidence = _.filter(analyseResult.articlesWithEvidence, (article) => {
      return article.evidence.entailment.length > 0
    })

    const items = _.map(articlesWithEvidence, (article, index) => {
      return (
        <EvidenceItem key={index}
          evidence={article}
          relatedClaims={article.evidence.entailment}
        />
      );
    });

    return (
      <div className="text-analyse-result-row">
        <span className="text-analyse-result-query-label">Supporting:</span>
        <span className="text-analyse-result-evidence-content">
          {items}
        </span>
      </div>
    );
  }

  renderContradictionEvidence() {
    const { analyseResult } = this.props;

    const articlesWithEvidence = _.filter(analyseResult.articlesWithEvidence, (article) => {
      return article.evidence.contradiction.length > 0
    })

    const items = _.map(articlesWithEvidence, (article, index) => {
      return (
        <EvidenceItem key={index}
          evidence={article}
          relatedClaims={article.evidence.contradiction}
        />
      );
    });

    return (
      <div className="text-analyse-result-row">
        <span className="text-analyse-result-query-label">Opposing:</span>
        <span className="text-analyse-result-evidence-content">
          {items}
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className="text-analyse-result">
        <p className="text-analyse-result-query-label">
          <u>Result:</u>
        </p>
        {this.renderQuery()}
        {this.renderTrustScore()}
        {this.renderEntailmentEvidence()}
        {this.renderContradictionEvidence()}
      </div>
    );
  }
}

export default AnalyseEvidencePanel;
