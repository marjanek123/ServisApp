import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMembers, get_member_user } from "../actions/member";
import { Redirect, Link } from "react-router-dom";

// import { withRouter } from 'react-router-dom';

class Group extends Component {
  static propTypes = {
    members: PropTypes.array.isRequired,
    getMembers: PropTypes.func.isRequired,
    get_member_user: PropTypes.func.isRequired,
  };

  // routeChange() {
  //   let path = `/detail`;
  //   this.props.history.push(path);
  // }

  componentDidMount() {
    this.props.getMembers();
    this.props.get_member_user();
  }

  render() {
    return (
      <Fragment>
        <h2>Pracownicy</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imie</th>
              <th>Data Dołączenia</th>
              <th>Uprawnienia</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.members.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.person.username}</td>
                <td>{member.date_joined}</td>
                <td>{member.permissions}</td>
                <td>
                  <button type="button" class="btn btn-primary">
                    Primary
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  members: state.member.members,
  member: state.member.member_user
});

export default connect(mapStateToProps, { getMembers, get_member_user })(Group);
