import React, { Component } from 'react';
//to hookup component to redux store
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; //react router that works inside browser

class Header extends Component {
  //inspect this.props and return JSX to render in header
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
//gets called with entire  state out of the redux store
function mapStateToProps({ auth }) {
  return { auth };
}
//set up connect helper
export default connect(mapStateToProps)(Header);
