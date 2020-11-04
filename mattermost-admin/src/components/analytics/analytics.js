import React, { Component } from "react";
import "../../common.scss";
import "./analytics.scss"
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Chart from "react-google-charts";
import callApi from "../../ultils/apiCaller";
class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    callApi("api/v4/analytics/old?name=standard", "GET", null, true).then(
      (res) => {
        if (res && res.data) {
          let data = [];
          res.data.forEach((element) => {
            console.log(Object.values(element));
            data.push(Object.values(element));
          });
          data.unshift(["Phân tích các team", "Số lượng"]);
          console.log(res.data);
          this.setState({
            data: data,
          });
        }
      }
    );
  };

  render() {
    const { isLogin } = this.props;
    const { data } = this.state;
    if (!isLogin) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container analytics-wrap">
        <Chart
          chartType="Bar"
          height={"500px"}
          loader={<div>Loading Chart</div>}
          data={data}
          chartType="BarChart"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authentication,
  };
};

export default connect(mapStateToProps, null)(Analytics);
