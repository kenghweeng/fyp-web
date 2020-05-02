import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {

  render() {
    const style = {
      padding: "0.25em 1em",
    }

    return (
      <nav
        style={style}
        className="navbar is-size-5"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item has-text-weight-semibold" to="/">Home</Link>
        </div>
        <div className="navbar-start">
          <Link className="navbar-item" to="/articles">Feed</Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
