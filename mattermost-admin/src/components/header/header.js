import React, { Component } from "react";
import "../../common.scss";
import "./header.scss";
import {
  Link,
} from "react-router-dom";
import {connect} from 'react-redux';

import {actLogout} from '../../actions/index'

class Header extends Component {


  signOutHandler = () => {
    this.props.logout();
  }

  /**
   * render component
   */
  render() {
    const { isLogin } = this.props;


    return (

      <div className="container header-wrap">
        <nav>
          <Link className="logo-wrap text-none" to="/">M2 Plus</Link>
          <div>
            {" "}
            {!isLogin ? (
              <div className="wrap-button flex flex-center">
                <Link
                  to="/signin"
                  id="signin-button"
                  className="pointer m-r-16 text-none"
                >
                  Sign in
                </Link>
                <Link to="/signup" className="get-start pointer text-none">
                  Get Started
                </Link>
              </div>
            ) : (
              <Link
                to="/"
                id="signin-button"
                className="pointer m-r-16 text-none"
                onClick={this.signOutHandler}
              >
                Sign out
              </Link>
            )}
          </div>
        </nav>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isLogin : state.authentication
  }
}


const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: (user) => {
      dispatch(actLogout(user));
    }
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Header);
