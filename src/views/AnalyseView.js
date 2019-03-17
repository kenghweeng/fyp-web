import React, { Component } from 'react';
import { BounceLoader } from 'react-spinners';

import moment from 'moment';
import Analyse from '../models/analyse';
import Articles from '../models/articles';

class AnalyseView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            analyseQuery: "",
            nlpData: [],
            nlpSayings: [],
            relatedArticles: [],
            isPrefetchRender: true,
            isFetchingAnalysis: false
        }

        this.fetchAnalysis             = this.fetchAnalysis.bind(this);
        this.analyseQueryKeyPressed    = this.analyseQueryKeyPressed.bind(this);
        this.analyseQueryChanged       = this.analyseQueryChanged.bind(this);
        this.handleSearchButtonClicked = this.handleSearchButtonClicked.bind(this);
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
                isFetchingAnalysis: true, 
                isPrefetchRender: false, 
            })
            const result = await this.fetchAnalysis(analyseQuery);
            this.setState({
                isFetchingAnalysis: false,
                nlpData: result.analyseData.data,
                nlpSayings: result.analyseData.sayings,
                relatedArticles: result.relatedArticles,
            })
        }
    }

    async fetchAnalysis(analyseQuery) {
        const relatedArticles = await Articles.searchRelatedArticlesBySentence(analyseQuery);
        const analyseData = await Analyse.analyseText(analyseQuery);
        return {
            relatedArticles,
            analyseData
        };
    }

    analyseQueryChanged(event) {
        this.setState({
            analyseQuery: event.target.value
        });
    }

    async analyseQueryKeyPressed(event) {
        if(event.key == 'Enter'){
            await this.handleSearchButtonClicked()
        }
    }

    async handleSearchButtonClicked(event) {
        this.props.history.push(`/analyse/?q=${this.state.analyseQuery}`);
        
        this.setState({ 
            isFetchingAnalysis: true, 
            isPrefetchRender: false, 
        })
        const result = await this.fetchAnalysis(this.state.analyseQuery);

        this.setState({
            isFetchingAnalysis: false,
            isPrefetchRender: false,
            nlpData: result.analyseData.data,
            nlpSayings: result.analyseData.sayings,
            relatedArticles: result.relatedArticles,
        })
    }

    renderSearchTextbox() {
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control" 
                    value={this.state.analyseQuery}
                    onChange={this.analyseQueryChanged}
                    onKeyPress={this.analyseQueryKeyPressed}
                    placeholder="Analyse Query" 
                    aria-label="Analyse query" />
                
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" 
                            type="button" onClick={this.handleSearchButtonClicked}>
                        Analyse
                    </button>
                </div>
            </div>   
        )
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
                            {publishedDate.from(currentDate)}
                        </div>
                    </div>
                </a>
                
            )
            relatedArticlesCards.push(render)
        })

        return (
            <div>
                <h4>Related Articles</h4>
                <div className="card-columns">
                {relatedArticlesCards.length > 0 ? relatedArticlesCards : <div>No related articles found.</div>}
                </div>
            </div>
        )
    }

    renderNLPSayings() {
        const sayingsRender = []
        this.state.nlpSayings.forEach((saying, index) => {
            const sentence = saying.saying
            const claimer = saying.claimer
            const render = (
                <p key={index}>
                    <strong>{claimer} claims:</strong> <br/> 
                    {sentence} 
                </p>
            )
            sayingsRender.push(render)
        })

        return (
            <div>
                <h4>Other claims by different entities in the text</h4>
                { sayingsRender.length > 0 ? sayingsRender : "No data to display." }
                
            </div>
        )
    }

    renderNLPAnalysisData() {
        const dataRender = []
        const fields = ["subject", "predicate", "object", "action", "prepPobj"]

        this.state.nlpData.forEach((data, index) => {
            let datumRender = ""

            if (data["subject"] !== "") {
                datumRender = datumRender + data["subject"]
            }
            if (data["predicate"] !== "") {
                if (data["predicateInverse"] !== "") {
                    datumRender = datumRender + " " + data["predicateInverse"] + " " + data["predicate"]
                } else {
                    datumRender = datumRender + " " + data["predicate"]
                }
            }
            if (data["object"] !== "") {
                datumRender = datumRender + " " + data["object"]
            }
            if (data["action"] !== "") {
                datumRender = datumRender + " " + data["action"]
            }
            if (data["prepPobj"] !== "") {
                datumRender = datumRender + " " + data["prepPobj"]
            }
            dataRender.push(<p key={index}>{datumRender.trim()}</p>);
        })

        return (
            <div>
                <h4>Analysed Claims in the text</h4>
                { dataRender.length > 0 ? dataRender : "No data to display." }
            </div>
        )
    }

    renderContentOrLoader() {
        const loader = (
            <div className='row sweet-loading search-textbox'>
                <div className="col-12">
                    <BounceLoader
                        sizeUnit={"px"}
                        size={60}
                        loading={this.state.isFetchingAnalysis}
                    />
                </div>
            </div> 
        )

        const content = (
            <div>
                <div className="row search-textbox">
                    <div className="col-12">
                        {this.renderNLPAnalysisData()}
                    </div>
                </div>       
                <div className="row search-textbox">
                    <div className="col-12">
                        {this.renderNLPSayings()}
                    </div>
                </div>
                <div className="row search-textbox">
                    <div className="col-12">
                        {this.renderRelatedArticles()}
                    </div>
                </div>
            </div>
        );

        return this.state.isFetchingAnalysis ? loader: content
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row search-textbox">
                    <div className="col-12">
                        {this.renderSearchTextbox()}
                    </div>
                </div>
                { this.state.isPrefetchRender ? null : this.renderContentOrLoader() }
                
            </div>
        )
    };
}

export default AnalyseView;