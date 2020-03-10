import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import DomainTable from "./components/DomainTable";
import SubdomainTable from "./components/SubdomainTable";
import PendingScansTable from "./components/PendingScansTable";
import NavigationBar from "./components/NavigationBar";
import "./components/style.css";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div style={{ background: "black !important" }}>
          <NavigationBar />

          <div className="content align-items-center">
            <Route exact path="/" component={DomainTable} />
            <Route exact path="/domains/" component={DomainTable} />
            <Route exact path="/subdomain/:name" component={SubdomainTable} />
            <Route exact path="/pending/" component={PendingScansTable} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
