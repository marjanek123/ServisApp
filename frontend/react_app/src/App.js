import "./App.css";
import { Provider } from "react-redux";
import store from "./components/store";
import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./components/groups/Dashboard";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
// import Header from "./components/layout/Header";
import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./components/actions/auth";
// import { loadGroup } from "./components/actions/group";
import Header from "./components/layout/Header";
import CreateGroup from "./components/groups/CreateGroup";
import GroupRoute from "./components/common/GroupRoute";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CreateGroupDashboard from "./components/groups/CreateGroupDashboard";
import GroupDashboard from "./components/groups/GroupDashboard";
import GroupAbout from "./components/groups/GroupAbout";
import Chat from "./components/groups/Chat";
import Calendary from "./components/groups/Calendary";
import ClientDashboard from "./components/groups/ClientsDashboard";
import ClientDetail from "./components/groups/ClientDetail";

// import SiteBarHeader from "./components/layout/SiteBarHeader";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div className="col-md-8 m-auto">
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/creategroup"
                  component={CreateGroupDashboard}
                />
                <PrivateRoute exact path="/calendary" component={Calendary} />
                {/* <GroupRoute exact path="/group" component={GroupDashboard} /> */}
                <GroupRoute exact path="/clients" component={ClientDashboard} />
                <GroupRoute
                  exact
                  path="/clientDetail"
                  component={ClientDetail}
                />
                <GroupRoute exact path="/chat" component={Chat} />
                <GroupRoute exact path="/groupabout" component={GroupAbout} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
