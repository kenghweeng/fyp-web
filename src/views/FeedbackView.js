import React, {Component} from 'react'

class FeedbackView extends Component {

    render() {
        return (
            <section className="jumbotron">
                <h1 className="display-4">Feedback</h1>
                <br /><br />
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSckteGmpNKlsoADQzaWAqBbGTQVFIPp_5L0baktICNYh7pfQg/viewform?embedded=true" width="720" height="1312" frameborder="0" marginHeight="0" marginWidth="0">Loading...</iframe>
            </section>

        );

    }


}

export default FeedbackView;