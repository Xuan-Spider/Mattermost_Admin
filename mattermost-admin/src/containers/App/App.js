import React, { Component } from "react";
import "../../../src/common.scss";
import "./App.scss";
import Header from "../../components/header/header";
import routes from "../../router";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Sideber from '../../components/sidebar/sidebar'

class App extends Component {
  
  /**
   * handlar routing for app
   */
  bindingComponent = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };

  render() {
    return (
      <Router>
        <div className="App">
          {/* header */}
          <Header></Header>
          <Sideber />

          <div id="wrap-content">{this.bindingComponent(routes)}</div>
        </div>

        <div>
          
        </div>
      </Router>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const connectedApp = connect(mapState, null)(App);
export { connectedApp as App };
