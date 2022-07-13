import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInviteList, acceptInviteDetail } from '../actions/member';
import { Redirect, Link } from 'react-router-dom';


// import { withRouter } from 'react-router-dom';

class InviteList extends Component {
  static propTypes = {
    invite_list: PropTypes.array.isRequired,
    getInviteList: PropTypes.func.isRequired,
    acceptInviteDetail: PropTypes.func.isRequired,
  };
  
  // routeChange() {
  //   let path = `/detail`;
  //   this.props.history.push(path);
  // }

  componentDidMount() {
    this.props.getInviteList();
  }

  render() {
    return (
      <Fragment>
        <h2>Zaproszenia</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa Grupy</th>
              <th>Opis</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.invite_list.map( item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.group.name}</td>
                <td>{item.group.about}</td>
                <td><button type="button" class="btn btn-success" onClick={this.props.acceptInviteDetail.bind(this, item.id)}>Primary</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  invite_list: state.member.invite_list
});

export default connect(mapStateToProps,{getInviteList, acceptInviteDetail})(InviteList);