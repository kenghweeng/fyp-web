import React, {Component} from 'react'
import _ from 'lodash'

import Tutorial from '../components/Tutorial';
import EvidenceItem from '../components/EvidenceItem'

import Analyse from '../models/analyse';

const ENTAILMENT_SCORE_INDEX    = 0;
const CONTRADICTION_SCORE_INDEX = 1;
const NEUTRAL_SCORE_INDEX       = 2;
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

    async componentWillMount() {
        const url = new URL(window.location.href);
    
        let analyseQuery = null
        if (url.searchParams.get("q") !== null) {
            analyseQuery = url.searchParams.get("q")
        }

        if (analyseQuery !== null) {
            this.setState({
                analyseQuery: analyseQuery
            })
            this.setState({ 
                isAnalysing: true
            })

            const analyseResult = await this.fetchAnalysis(analyseQuery);
            analyseResult.query = analyseQuery;
            this.setState({ 
                isAnalysing: false,
                analyseResult: analyseResult
            });
        }
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
        console.log(analyseResult)
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


    handleChromeExtensionButtonOnClicked(event) {
        window.open("https://chrome.google.com/webstore/detail/pinocchio-news/ffdhkmfojfhdclcekhjohjalhccnceja",'_blank');
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
            const totalNumberOfArticles = this.state.analyseResult.articlesWithEvidence.length
            
            let totalScore    = 0
            let numEntails    = 0
            let numNeutral    = 0
            let numContradict = 0
            
            for (const article of this.state.analyseResult.articlesWithEvidence) {
                for (const evidence of article.evidence.entailment) {
                    totalScore += evidence.score[0]
                    numEntails += 1
                }
                    
                for (const evidence of article.evidence.contradiction) {
                    totalScore += evidence.score[1]
                    numContradict += 1
                }
                    
            }

            console.log(totalScore)
            console.log(numContradict + numEntails + numContradict)
            
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
                    <span className="text-analyse-result-query-content" 
                        style={trustScoreStyle}
                    >{finalScore}%</span>
                </div>
            );
        }

        const renderEntailmentEvidence = () => {
            const items = [];
            
            for (const [index, article] of this.state.analyseResult.articlesWithEvidence.entries()) {
                if (article.evidence.entailment.length <= 0)
                    continue
                
                items.push(
                    <EvidenceItem key={index} 
                        evidence={article} 
                        relatedClaims={article.evidence.entailment}
                    />
                );
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

        const renderContradictionEvidence = () => {
            const items = [];
            
            for (const [index, article] of this.state.analyseResult.articlesWithEvidence.entries()) {
                if (article.evidence.contradiction.length <= 0)
                    continue
                
                items.push(
                    <EvidenceItem key={index} 
                        evidence={article} 
                        relatedClaims={article.evidence.contradiction}
                    />
                );
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

        const renderMaybeEvidence = () => {
            const items = [];
            
            for (const [index, article] of this.state.analyseResult.articlesWithEvidence.entries()) {
                if (article.evidence.neutral.length <= 0)
                    continue
                
                items.push(
                    <EvidenceItem key={index} 
                        evidence={article} 
                        relatedClaims={article.evidence.neutral}
                    />
                );
            }

            return (
                <div className="text-analyse-result-row">
                    <span className="text-analyse-result-query-label">Related:</span>
                    <span className="text-analyse-result-evidence-content">
                        {items}
                    </span>
                </div>
            );
        }

        if (this.state.isAnalysing) {
            return this.renderAnalysingLoader();
        }

        if (this.state.analyseResult.query === undefined) {
            return null
        }

        if (!this.state.analyseResult.queryHasClaims) {
            return (
                <div className="text-analyse-result">
                    <Tutorial />
                </div>
            )
        }

        return (
            <div className="text-analyse-result">
                <p className="text-analyse-result-query-label"><u>Result</u></p>
                {renderQuery()}
                {renderTrustScore()}
                <hr />
                {renderEntailmentEvidence()}
                <hr />
                {renderContradictionEvidence()}
                <hr />

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
                    
                    <button onClick={this.handleChromeExtensionButtonOnClicked}
                        className="chrome-extension-download-btn">CHROME EXTENSION</button>
                </section>

                <section className="container text-analyse-container">
                    <section className="text-analyse-input-section">
                        <article className="text-analyse-textarea">
                            <textarea 
                                placeholder="Copy some news from anywhere on the web to try!" 
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