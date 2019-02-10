import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component {
    
    render() {
      return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 text-center footer">
                    © 2019 National University of Singapore; W.H. Desmond Ang
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default Footer;
  