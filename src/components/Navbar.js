import React, { Component } from 'react';
import { Link } from "react-router-dom";

const navigation = [
    {
        title: "About",
        link: "/about"
    },
    {
        title: "Feedback",
        link: "/feedback"
    },
]


class Navbar extends Component {

    generateNavLinks() {
        const navLinks = navigation.map(nav => {
            const className = ""
            if (window.location.pathname.indexOf(nav.title) === 0) {
                className = className + "active"
            }
            return (
                <Link key={nav.title} to={nav.link} className={className}>{nav.title}</Link>
            )
        })
        return navLinks;
    }

    render() {
      return (
          <div className="container">
            <div className="nav-row">
                <div className="nav-row-logo">
                    <Link to="/">Pinocchio</Link>
                </div>
                <div className="nav-row-links">
                    {this.generateNavLinks()}
                </div>
            </div>
          </div>
      );
    }
}
  
export default Navbar;
  