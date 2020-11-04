import React, { Component } from "react";
import "../../common.scss";
import "./content.scss";
import Footer from "../footer/footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import mattermostLogo from '../../images/mattermost.png'

class Content extends Component {
 
  render() {
    const { isLogin } = this.props;

    if(isLogin) {
      return <Redirect to="/team-management" />;
    }
    return (
      <div>
        <div className="container content-wrap">
          <div className="introduce-block  p-16 flex-center first-block">
            <div className="left-block">
              <h1 className="font-big">Nền tảng message cho doanh nghiệp</h1>
              <div className=" m-t-8 font-18">
                Mattermost là nền tảng chat online cho doanh các tổ chức, doanh nghiệp 
              </div>
              <div className="m-t-8 font-18 m-b-16">
                Với mattermost doanh nghiệp có thể có một hệ thống chat nội bộ an toàn với các thành viên của đội nhóm tương ứng.
              </div>
            </div>

            <div className="right-block">
              <img className="image-full"
                src= 'https://ucarecdn.com/cabc4f52-4a47-4da2-85c3-341fae199b6e/-/format/auto/-/quality/lighter/-/max_icc_size/10/-/resize/1576x/'
                alt="logo"
              />
            </div>
          </div>
          <div className="introduce-block flex-column p-16 flex-center">
            <div className="left-block ">
              <b></b>
              <div className="bold font-big">
                Tạo nhóm
              </div>
              <div className="font-18 m-b-16" >
                Làm việc theo các nhóm riêng trong công ty, doanh nghiệp dễ dàng quản lý các nhóm đội hơn
              </div>
            </div>

            <div className="">
              <img
                src="https://mattermost.com/wp-content/uploads/2019/07/collaborate-securely.png"
                alt="logo"
              />
            </div>
          </div>


          <div className="introduce-block flex p-16 flex-center">
            <div className="left-block">
              <b></b>
              <div className="bold font-big">
                Tạo các kênh
              </div>
              <span>
                Cho phép người dùng tạo các kênh mở cũng như đóng và mời thành viên tham gia
              </span>
            </div>

            <div className="right-block">
              <img
                src="https://mattermost.com/wp-content/uploads/2019/07/centralize.png"
                alt="logo"
              />
            </div>
          </div>
        </div>
        {/* footer */}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin : state.authentication
  };
};

export default connect(mapStateToProps, null)(Content);

