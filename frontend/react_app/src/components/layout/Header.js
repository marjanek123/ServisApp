import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import { logout } from "../actions/auth";
import { getMembers } from "../actions/member";
import { getChatList, newMessage } from "../actions/chat";
import { Redirect } from "react-router-dom";

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    newMessage: PropTypes.func.isRequired,
    chatList: PropTypes.array.isRequired,
    getChatList: PropTypes.func.isRequired,
    newmessage: PropTypes.bool.isRequired,
  };

  // componentDidMount() {
  //   this.props.getMembers();
  // }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.props.newMessage();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { isGroup } = this.props.group;
    if (this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    const loginLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    const authLinks = <Button onClick={this.props.logout}>Logout</Button>;

    const withGroup = (
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Home
          </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#/calendary">
            Kalendarz
          </a>
        </li>
        {/* <li class="nav-item">
          <a class="nav-link" href="#/group">
            Pracownicy
          </a>
        </li> */}
        <li class="nav-item">
          <a class="nav-link" href="#/clients">
            Klienci
          </a>
        </li>
        {/* <li class="nav-item">
        <a class="nav-link" href="#/visits">Wizyty</a>
      </li> */}
        <li class="nav-item">
          <button type="button" class="btn position-relative btn-sm ">
            <a class="nav-link" href="#/chat">
              Czat
            </a>
            {this.props.newmessage ? (
              <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1">
                <span class="visually-hidden">unread messages</span>
              </span>
            ) : (
              ""
            )}
          </button>
        </li>
        {/* <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Czat
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li> */}
      </ul>
    );

    const noGroup = (
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/creategroup">
            Dołącz do Grupy
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a class="navbar-brand" href="#">
            {user ? `Welcome ${user.username}` : ""}
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            {isGroup ? withGroup : noGroup}
          </div>
          {isAuthenticated ? authLinks : loginLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  group: state.group,
  chatList: state.chat.chatList,
  newmessage: state.chat.newmessage,
  // members: state.member.members
});

export default connect(mapStateToProps, { logout, newMessage, getChatList })(
  Header
);
