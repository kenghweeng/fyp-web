import React, { Component } from 'react'
import _ from 'lodash'

import AnalyseEvidencePanel from './AnalyseEvidencePanel';
import Analyse from '../../models/analyse';


class AnalyseView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      analyseQuery: "",
      analyseResult: {},
      isAnalysing: false,
    }

    _.bindAll(this, [
      'fetchAnalysis',
      'handleAnalyseButtonOnClicked',
      'handleTextAreaOnChanged',
      'handleChromeButtonClick',
    ])
  }

  async componentWillMount() {
    const url = new URL(window.location.href);

    let analyseQuery = null;
    if (url.searchParams.get("q") !== null) {
        analyseQuery = url.searchParams.get("q");
    }

    if (analyseQuery === null) {
      return;
    }

    this.setState({
      analyseQuery: analyseQuery,
      isAnalysing: true
    })

    const analyseResult = await this.fetchAnalysis(analyseQuery);
    analyseResult.query = analyseQuery;
    this.setState({
      isAnalysing: false,
      analyseResult: analyseResult
    });
  }

  async fetchAnalysis(analyseQuery) {
    const analyseData = await Analyse.analyseText(analyseQuery);
    return analyseData;
  }

  async handleAnalyseButtonOnClicked(event) {
    const { analyseQuery } = this.state;

    this.setState({
      isAnalysing: true,
      error: null,
    });

    const analyseResult = await this.fetchAnalysis(analyseQuery);

    if (analyseResult.error) {
      this.setState({
        isAnalysing: false,
        error: analyseResult.error,
      });
      return;
    }

    analyseResult.query = analyseQuery;
    this.setState({
      isAnalysing: false,
      analyseResult: analyseResult
    });
  }

  handleTextAreaOnChanged(event) {
    this.setState({
      analyseQuery: event.target.value
    })
  }

  handleChromeButtonClick(event) {
    window.open(
      'https://chrome.google.com/webstore/detail/pinocchio-news/ffdhkmfojfhdclcekhjohjalhccnceja',
      '_blank'
    );
  }

  renderHeader() {
    const heroStyle = {
      padding: '2em 0',
    };

    const listStyle = {
      listStyleType: 'disc',
      paddingLeft: '2em',
    }

    return (
      <section className="hero">
        <div className="hero-body" style={heroStyle}>
          <div className="container">
            <h1 className="title is-size-1">
              Pinocchio
            </h1>
            <p className="subtitle">
              Pinocchio verifies your claims  against a corpus of COVID-19 news
              articles published in China, Hong Kong, South Korea and Singapore from &nbsp;
              <span className="has-text-info">1 April 2020</span> to
              <span className="has-text-info"> 30 April 2020</span>.
              You can check claims like:
            </p>
            <ul style={listStyle}>
              <li>COVID-19 could spread from animals to humans</li>
              <li>Drinking disinfectant can kill coronavirus</li>
            </ul>
          </div>
          <br />
          <button
            onClick={this.handleChromeButtonClick}
            className="button is-primary"
          >
            CHROME EXTENSION +
          </button>
        </div>
      </section>
    );
  }

  renderAnalyseInput() {
    return (
      <div className="columns">
        <div className="is-10 column">
          <input
            placeholder="Copy some news from anywhere on the web to try!"
            className="input"
            onChange={this.handleTextAreaOnChanged}
            value={this.state.analyseQuery}
          />
        </div>
        <div className="column">
          <button
            className="button is-info"
            onClick={this.handleAnalyseButtonOnClicked}
          >
            ANALYSE
          </button>
        </div>
      </div>
    );
  }

  renderError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }

    return (
      <article className="message is-danger">
        <div className="message-header">
          <p>Error</p>
        </div>
        <div className="message-body">
          {error}
        </div>
      </article>
    );
  }

  renderAnalyseResult() {
    const { isAnalysing, analyseResult } = this.state;
    if (isAnalysing) {
      return (
        <div className="has-text-centered">
          <img src='/assets/block-loading.gif' />
        </div>
      );
    }

    if (_.isEmpty(analyseResult)) {
      return null;
    }

    return (
      <AnalyseEvidencePanel analyseResult={analyseResult} />
    );
  }

  render() {
    const containerStyle = {
      paddingLeft: '5em',
      paddingRight: '5em',
    }

    return (
      <section style={containerStyle} className="container">
        {this.renderHeader()}
        {this.renderAnalyseInput()}
        {this.renderError()}
        {this.renderAnalyseResult()}
      </section>
    );
  }
}

export default AnalyseView;