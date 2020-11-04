import React, { Component } from "react";
import "../../common.scss";
import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

class Footer extends Component {
  render() {
    return (
      <div className=" footer-wrap">
        <div className="left-list flex flex-center">
          <div className="logo-uet m-r-16 pointer"><a  href="https://uet.vnu.edu.vn/">UET</a></div>
          <div className="contact pointer"><a href="https://www.facebook.com/dinhxuan9807">Contact Us</a></div>
        </div>

        <div className="right-list">
          <div className="icon-item">
            <FontAwesomeIcon icon={faCoffee} className="pointer m-r-16"/>
            <FontAwesomeIcon icon={faCoffee} className="pointer m-r-16"/>
            <FontAwesomeIcon icon={faCoffee} className="pointer m-r-16"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
