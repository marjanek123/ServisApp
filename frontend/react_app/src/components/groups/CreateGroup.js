import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { createGroup }from "../actions/group";
import {  makeStyles, withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
// import TextArea from "@material-ui/core/TextArea"
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Redirect } from 'react-router-dom';
const drawerWidth = 240;
const useStyles = (theme) => ({
  appBarShift: {
    marginTop: theme.spacing(5),
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
	form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }})


class CreateGroup extends Component {
  state={
    name: "",
    about: ""
  };
	static propTypes = {
    createGroup: PropTypes.func.isRequired
  };


	onChange = e =>this.setState({ [e.target.name]: e.target.value });
	onSubmit = (e) => {
    console.log(this.state.name);
    console.log(this.state.about);
    e.preventDefault();
		const{ name,about}=this.state;

		const group = {name,about}
    this.props.createGroup(group);
  };
  
  render() {
			
			const {name, about} = this.state;
			if(this.props.group.isGroup){
				return <Redirect to="/groupabout" />
			}
    return (

      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Create Your group</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name Group</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.onChange}
                value={name}
              />
              <label>About your group</label>
              <textarea
                type="text"
                className="form-control"
                name="about"
                onChange={this.onChange}
                value={about}
              />
            
            
              <button type="submit" className="btn btn-primary">
                Greate Group
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  group: state.group,
});
export default connect(mapStateToProps,{createGroup})(withStyles(useStyles)(CreateGroup))