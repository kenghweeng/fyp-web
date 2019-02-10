import React, { Component } from 'react';
import { Link } from "react-router-dom";

const navigation = [
    {
        title: "Search",
        link: "/search"
    },
    {
        title: "Analyse",
        link: "/analyse"
    },
    {
        title: "Survey",
        link: "/survey"
    },
]


class Navbar extends Component {

    generateNavLinks() {
        const navLinks = navigation.map(nav => {
            const className = "nav-link "
            if (window.location.pathname.indexOf(nav.title) === 0) {
                className = className + "active"
            }
            return (
                <li className="nav-item" key={nav.title}>
                    <Link to={nav.link} className={className}>{nav.title}</Link>
                </li>
            )
        })
        return navLinks;
    }
    
    render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Pinocchio</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {this.generateNavLinks()}
                </ul>
            </div>
        </nav>
      );
    }
  }
  
  export default Navbar;
  