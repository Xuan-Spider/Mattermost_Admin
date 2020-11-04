import React, { Component } from "react";
import "../../common.scss";
import "./sidebar.scss";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import GroupIcon from '@material-ui/icons/Group';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
class Sidebar extends Component {


  /**
   * render component
   */
  render() {
    const { isLogin } = this.props;

    return (
      <div >
        {isLogin ? (
          <div className= "sidebar-wrap">
            <NavLink
              to="/team-management"
              className="pointer  text-none one-tab"
              onClick={this.signOutHandler}
              activeStyle={{ background: 'rgba(21, 14, 14, 0.35)' }}
            >
              <GroupIcon className="m-r-8"/>
              Quản lý team
            </NavLink>
            <NavLink
              to="/user-management"
              className="pointer text-none one-tab"
              onClick={this.signOutHandler}
              activeStyle={{ background: 'rgba(21, 14, 14, 0.35)' }}
            >
              <ChatBubbleRoundedIcon className="m-r-8"/>
              Quản lý kênh
            </NavLink>
            <NavLink
              to="/analytics"
              className="pointer  text-none one-tab"
              onClick={this.signOutHandler}
              activeStyle={{ background: 'rgba(21, 14, 14, 0.35)' }}
            >
              <EqualizerIcon className="m-r-8"/>
              Báo cáo
            </NavLink>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authentication,
  };
};

export default connect(mapStateToProps, null)(Sidebar);
