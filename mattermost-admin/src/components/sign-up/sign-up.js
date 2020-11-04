import React, { Component } from "react";
import "../../common.scss";
import "./sign-up.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { actCallApiSignUp } from "../../actions";



/**
 * team management component
 * ? display all team current user manager
 */
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.preventDefault();
    const { email, password } = this.state;
    // Gọi service login -> nếu có thì cho vào
    const newUser = {
      email: email,
      password: password
    };

    this.props.inputSignUp(newUser);
    
  };

  render() {
    const {isSucess, isLogin} = this.props;
    if (isSucess && isSucess.isSucess && !isLogin) {
      return <Redirect to="/signin" />;
    } else if(isLogin) {
      return <Redirect to="/team-management" />;

    }

    return (
      <form onSubmit={this.handleSubmit} className="container sign-in-wrap">
        <div className="session">
          {/* <div className="left flex flex-center font-18">UET mattermost</div> */}
          <div  className="log-in" autoComplete="off">
            <h4>Đăng ký </h4>
            <p>Chào mừng bạn đến với với M2 Plus</p>

            {/* email */}
            <div className="floating-label">
              <div></div>
              <input
                placeholder="Email"
                type="text"
                name="email"
                value={this.state.username}
                onChange={this.handleChange}
                id="email"
                autoComplete="off"
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
                value={this.state.password}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password:</label>
              <div className="icon">
                {" "}
                <FontAwesomeIcon icon={faUnlock} className="pointer m-r-16" />
              </div>
            </div>

            {/* footer */}
            <button type="submit" className="pointer">
              Đăng ký
            </button>
          </div>
        </div>
      </form>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isSucess : state.userReducer,
    isLogin : state.authentication
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    inputSignUp: (user) => {
      dispatch(actCallApiSignUp(user));
    }
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(SignUp);
