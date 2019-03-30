import React, { Component } from 'react';

class Tutorial extends Component {
    
    render() {
      return (
        <div className="alert alert-warning tutorial">
            <h3>Opps! We are unable to extract any claims from your query. </h3>
            <br />
            <p>Pinocchio's algorithm requires your query to be similar to the pattern below: </p>
            <h5 className="tutorial-pattern"> <strong>[subject]</strong> ... <strong>[predicate/verb]</strong> ... <strong>[object]</strong> ... </h5>
            <p><strong>An Example:</strong></p>
            <p>Pilots leaving from Changi and Seletar airports will be subjected to random alcohol tests from Sunday (Mar 31), the Civil Aviation Authority of Singapore (CAAS) announced on Thursday</p>
        </div>
      );
    }
  }
  
  export default Tutorial;
  