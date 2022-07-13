import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchUsers, addUserToGroup } from "../actions/member";

// import { withRouter } from 'react-router-dom';

class InviteMemberToGroup extends Component {
  state = {
    search: "",
  };
  static propTypes = {
    search_user_list: PropTypes.array.isRequired,
    group: PropTypes.object.isRequired,
    searchUsers: PropTypes.func.isRequired,
    addUserToGroup: PropTypes.func.isRequired,
  };

  // routeChange() {
  //   let path = `/detail`;
  //   this.props.history.push(path);
  // }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSearch = (e) => {
    e.preventDefault();
    const { search } = this.state;
    this.props.searchUsers(search);
  };

  render() {
    const { search } = this.state;
    console.log(this.props.group.id);
    return (
      <Fragment>
        <div className="my-4">
          <h2>+Zaproś Urzytkownika Do Grupy</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nazwa Urzytkownika</th>
                <th>
                  <form class="form-inline my-2 my-lg-0">
                    <table>
                      <tr>
                        <td>
                          <input
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={search}
                            name="search"
                            onChange={this.onChange}
                          ></input>
                        </td>
                        <td>
                          <button
                            class="btn btn-outline-success my-2 my-sm-0"
                            onClick={this.onSearch}
                          >
                            Search
                          </button>
                        </td>
                      </tr>
                    </table>
                  </form>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.search_user_list.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={this.props.addUserToGroup.bind(
                        this,
                        item.id,
                        this.props.group.id
                      )}
                    >
                      Dodaj
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  search_user_list: state.member.search_user_list,
  group: state.group.group,
});

export default connect(mapStateToProps, { searchUsers, addUserToGroup })(
  InviteMemberToGroup
);
