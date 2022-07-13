import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import  PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../actions/auth";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired,
    createMagickCode: PropTypes.func.isRequired
  } 
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    const {username,email, password, password2} = this.state;
    if( password == password2){
      const NewUser={
        username,email,password
      }
      this.props.register(NewUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    if(this.props.isAuthenticated){
      return <Redirect to="/" />
    }
    const { username, email, password, password2 } = this.state;

    return (
      
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <label>Username</label>
            <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
            />
            </div>
            <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
            />
            </div>
            <div className="form-group">
            <label>Password</label>
            <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
            />
            </div>
            <div className="form-group">
            <label>Confirm Password</label>
            <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
            />
            </div>
            <div className="form-group">
            <button type="submit" className="btn btn-primary">
                Register
            </button>
            </div>
            <p>
            Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(
  withStyles(useStyles)(Register)
);
