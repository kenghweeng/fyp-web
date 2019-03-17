import React, { Component } from 'react';

class AboutView extends Component {

    render() {
        return (
            <section>
                <section className="jumbotron about-jumbotron">
                    <h1 className="display-4">About</h1>
                </section>

                <section className="container">
                    <h3>Why Pinocchio?</h3>

                    <p className="lead">
                    Since the last decade, social media has increasingly become a huge part of modern everyday lives. 
                    Social media platforms such as Facebook, Twitter, and Reddit provide an avenue for users to interact 
                    online by sharing life updates, comedic memes and videos with each other. Many users also utilize these 
                    platforms as a major source of news and also as a channel to share them with their friends and followers.
                    </p>
                    <p className="lead">
                    Social media platforms are designed for virality. Sharing a news post on Facebook or re-tweeting a news tweet 
                    on Twitter to thousands and millions of people is as simple as a click on a button. As a result, 
                    the speed of circulation and dissemination for any piece of information on social media is lightning fast 
                    compared to traditional news channels. On the other hand, the truthfulness and quality of information being 
                    shared on social media are questionable because of the lack of curation and corroboration of the facts presented. 
                    Furthermore, news feed algorithms that social media platforms employ to display personalized posts for 
                    the users are tuned to surface posts that the user prefers. Hence, passive news consumers on social media 
                    who do not actively search for alternative voices, will not be able to break out of the echo chamber being 
                    constructed around them. This could have a major impact on their worldviews and perspectives.
                    </p>
                    <p className="lead">
                    The lightning speed of circulation, coupled with the lack of fact-checking mechanism and news feed preference 
                    algorithms made social media platforms a prime weapon for the disinformation campaign and this is the real reason 
                    why false information on social media has become a thread which undermines the sanctity of a social and democratic process. 
                    </p>
                    
                    <br/>

                    <h3>How Pinocchio works?</h3>
                    <div className="alert alert-danger" role="alert">
                        <strong>Disclaimer:</strong> All analysis are performed based on Pinocchio's internal trust-scoring algorithms and may or may not reflect the actual intentions, views, opinions of the original journalists or the news publisher.
                    </div>
                    
                    <p className="lead">
                    Pinocchio is a truth evaluation framework. Its name is derived from the classic fairytale Pinocchio. 
                    </p>
                    <p className="lead">
                    The framework treats the information from news articles from reputable news agencies as ground truths. The assumption underpinning the framework is that professional journalism and editorial practices of these reputable news agencies will produce a highly credible source of information.
                    </p>
                    <p className="lead">
                    Pinocchio does not generate a hard distinction on whether a particular piece of information is true or false, but rather, the final evaluation score that it generates is a estimation of whether that piece of information is true.
                    </p>
                    <p className="lead">
                    Pinocchio operates in the following manner:
                    <ol>
                        <li>Pinocchio maintains an up-to-date corpus of news articles from several reputable news publishing agencies.</li>
                        <li>Whenever a user wants to query as certain fact, Pinocchio will search for relevant articles in the corpus to produce supporting or opposing evidence.</li>
                        <li>The content of the query and the articles are processed using a Natural Language Processing (NLP) algorithm to extract relevant information.</li>
                        <li>We then compare -- using cosine similarity -- whether the content in the news articles "supports" or "refutes" the content in the query.</li>
                        <li>A final score is then generated based on the previous cosine simiarity scores.</li>
                    </ol>
                    </p>

                    <br/>

                    <h3>Can I trust Pinocchio?</h3>
                    <p className="lead">
                        Pinocchio is a research project and it is still under heavy development. The trust-scoring algorithm being used is still being fine-tuned and is not 100% accurate.
                        However, the purpose of launching this alpha version is to understand the process of how users consume information on the internet and whether they would actively verify the vercity of 
                        those information. 
                    </p>
                </section>

            </section>

        );
    }


}

export default AboutView;