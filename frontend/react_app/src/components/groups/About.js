import React, { Component } from "react";
import { loadGroup } from "../actions/group";
import store from "../store";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class About extends Component {
  componentDidMount() {
    store.dispatch(loadGroup());
  }
  render() {
    if(this.props.isGroup) {
        return <Redirect to="/groupabout" />
    }

    return (
      <div>
        
        <h1>Tutorial</h1>
        <p>mu tou sobie tak piszemy</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isGroup: state.group.isGroup,
});

export default connect(mapStateToProps)(About);
