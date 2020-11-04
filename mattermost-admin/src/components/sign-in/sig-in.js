import React, { Component } from "react";
import "../../common.scss";
import "./sign-in.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {actCallApiSignIn} from '../../actions/index'


/**
 * team management component
 * ? display all team current user manager
 */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  onLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    // Gọi service login -> nếu có thì cho vào
    const systemUserInfor = {
      login_id: email,
      password: password,
      token: "",
    };

    this.props.inputSigin(systemUserInfor);
  };


  // Render 
  render() {
    const { email, password } = this.state;
    const { isLogin } = this.props;


    if (isLogin) {
      return <Redirect to="/team-management" />;
    }
    return (
      <form onSubmit={this.onLogin} className="container sign-in-wrap">
        <div className="session">
          {/* <div className="left flex flex-center font-18">UET mattermost</div> */}
          <div className="log-in" autoComplete="off">
            <h4>Đăng nhập</h4>
            <p>Chào mưng bạn trở lại mới M2 Plus</p>

            {/* email */}
            <div className="floating-label">
              <div></div>
              <input
                placeholder="Email"
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
                onChange={this.onChange}
              />
              <label htmlFor="email">Email:</label>
              <div className="icon">
                <FontAwesomeIcon
                  icon={faEnvelopeOpen}
                  className="pointer m-r-16"
                />
              </div>
            </div>

            {/* password */}
            <div className="floating-label">
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={this.onChange}
              />
              <label htmlFor="password">Password:</label>
              <div className="icon">
                {" "}
                <FontAwesomeIcon icon={faUnlock} className="pointer m-r-16" />
              </div>
            </div>

            {/* footer */}
            <button type="submit" className="pointer">
              Đăng nhập
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin : state.authentication
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    inputSigin: (user) => {
      dispatch(actCallApiSignIn(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
