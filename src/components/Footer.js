import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component {
    
    render() {
      return (
        <div className="footer container-fluid">
            <div className="row">
                <div className="col-12 text-center footer">
                    © Pinocchio News App
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default Footer;
  