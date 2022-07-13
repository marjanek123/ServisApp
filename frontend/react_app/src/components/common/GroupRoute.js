import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const GroupRoute = ({ component: Component, auth, group, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!group.isGroup) {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});

export default connect(mapStateToProps)(GroupRoute);

