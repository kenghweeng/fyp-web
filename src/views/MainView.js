import React, {Component} from 'react'
import _ from 'lodash'
import EvidenceItem from '../components/EvidenceItem'

import Analyse from '../models/analyse';

class MainView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            analyseQuery: "",
            analyseResult: {},
            isAnalysing: false,
        }

        this.fetchAnalysis = this.fetchAnalysis.bind(this);

        this.handleTextAreaOnChanged = this.handleTextAreaOnChanged.bind(this);
        this.handleAnalyseButtonOnClicked = this.handleAnalyseButtonOnClicked.bind(this);

        this.renderAnalysingLoader = this.renderAnalysingLoader.bind(this);
        this.renderAnalyseResult   = this.renderAnalyseResult.bind(this);
    }

    async fetchAnalysis(analyseQuery) {
        const analyseData = await Analyse.analyseText(analyseQuery);
        return analyseData;
    }

    async handleAnalyseButtonOnClicked(event) {
        this.setState({
            isAnalysing: true
        })

        const analyseResult = await this.fetchAnalysis(this.state.analyseQuery);
        analyseResult.query = this.state.analyseQuery;
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

    renderAnalysingLoader() {
        return (
            <div className="text-analyse-result-loader">
                <img src='/assets/block-loading.gif' />
            </div>
        );
    }

    renderAnalyseResult() {
        const renderQuery = () => {
            return (
                <div className="text-analyse-result-row">
                    <span className="text-analyse-result-query-label">Query:</span>
                    <span className="text-analyse-result-query-content">{this.state.analyseResult.query} </span>
                </div>
            );
        }

        const renderTrustScore = () => {
            let supportingScore = 0
            let opposingScore = 0

            for (const evidence of this.state.analyseResult.supporting) {
                supportingScore = supportingScore + evidence[1];
            }
            if (this.state.analyseResult.supporting.length > 0) {
                supportingScore = supportingScore / this.state.analyseResult.supporting.length
            }
            
            
            for (const evidence of this.state.analyseResult.opposing) {
                opposingScore = opposingScore + evidence[1];
            }
            if (this.state.analyseResult.opposing.length > 0) {
                opposingScore = opposingScore / this.state.analyseResult.opposing.length
            }
            
            const finalScore = Math.ceil((supportingScore - opposingScore) * 100) 

            let trustScoreColor;
            if (finalScore >= 80) {
                trustScoreColor = "green"
            } else if (finalScore >= 40) {
                trustScoreColor = "black"
            } else {
                trustScoreColor = "red"
            }

            const trustScoreStyle = {
                color: trustScoreColor
            }

            return (
                <div className="text-analyse-result-row">
                    <span className="text-analyse-result-query-label">Trust score:</span>
                    <span className="text-analyse-result-query-content" 
                        style={trustScoreStyle}
                    >{finalScore}%</span>
                </div>
            );
        }

        const renderSupportingEvidence = () => {
            const items = [];
            const uniqueSupportingArticles = _.uniqBy(this.state.analyseResult.supporting, (e) => {
                return e[2].url
            })
            for (const [index, evidence] of uniqueSupportingArticles.entries()) {
                items.push(<EvidenceItem key={index} evidence={evidence[2]} />)
            }

            return (
                <div className="text-analyse-result-row">
                    <span className="text-analyse-result-query-label">Supporting:</span>
                    <span className="text-analyse-result-evidence-content">
                        {items}
                    </span>
                </div>
            );
        }

        const renderOpposingEvidence = () => {
            const items = [];
            const uniqueOpposingArticles = _.uniqBy(this.state.analyseResult.opposing, (e) => {
                return e[2].url
            })
            for (const [index, evidence] of uniqueOpposingArticles.entries()) {
                items.push(<EvidenceItem key={index} evidence={evidence[2]} />)
            }

            return (
                <div className="text-analyse-result-row">
                    <span className="text-analyse-result-query-label">Opposing:</span>
                    <span className="text-analyse-result-evidence-content">
                        {items}
                    </span>
                </div>
            );
        }

        if (this.state.isAnalysing) {
            return this.renderAnalysingLoader();
        }

        if (this.state.analyseResult.relatedArticles === undefined) {
            return null
        }

        return (
            <div className="text-analyse-result">
                <p className="text-analyse-result-query-label"><u>Result</u></p>
                {renderQuery()}
                {renderTrustScore()}
                <hr />
                {renderSupportingEvidence()}
                <hr />
                {renderOpposingEvidence()}

            </div>
        )

    }

    render() {
        return (
            <section>
                <section className="jumbotron">
                    <h1 className="display-4">Fake News Detection made simple</h1>
                    <p className="lead">
                        highlight any news text you read on online to verify its trustworthiness.
                    </p>
                    <div>
                        <img width="50px" height="50px" src='https://img.icons8.com/dusk/2x/whatsapp.png' /> &nbsp;&nbsp;&nbsp;
                        <img width="50px" height="50px" src='https://img.icons8.com/dusk/2x/facebook.png' /> &nbsp;&nbsp;&nbsp;
                        <img width="50px" height="50px" src='https://img.icons8.com/dusk/2x/twitter.png' /> &nbsp;&nbsp;&nbsp;
                        <img width="50px" height="50px" src='https://img.icons8.com/dusk/2x/reddit.png' /> &nbsp;&nbsp;&nbsp;
                    </div>
                    
                    <button className="chrome-extension-download-btn">CHROME EXTENSION</button>
                </section>

                <section className="container text-analyse-container">
                    <section className="text-analyse-input-section">
                        <article className="text-analyse-textarea">
                            <textarea 
                                placeholder="Copy some text from anywhere on the web to try!" 
                                className="form-control" rows="4"
                                onChange={this.handleTextAreaOnChanged}
                                value={this.state.analyseQuery}
                            >
                            </textarea>
                        </article>
                        <button 
                            className="text-analyse-btn"
                            onClick={this.handleAnalyseButtonOnClicked}
                        >
                            ANALYSE
                        </button>
                    </section>
                    
                    <section className="text-analyse-result-section">
                        {this.renderAnalyseResult()}
                    </section>

                </section>
            </section>
            
        )
    }
}

export default MainView;