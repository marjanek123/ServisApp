import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchUsers, addUserToGroup } from "../actions/member";
import { getClients, get_clients_detail } from "../actions/clients";
import { getClientEvents } from "../actions/calendar";
import { Link } from 'react-router-dom';
import { Modal } from "react-bootstrap";
// import { withRouter } from 'react-router-dom';

class InviteMemberToGroup extends Component {
  state = {
    search: "",
    page: 1,
    showClient:false,
  };
  static propTypes = {
    clientsList: PropTypes.array.isRequired,
    get_clients_detail: PropTypes.func.isRequired,
    getClients: PropTypes.func.isRequired,
    getClientEvents: PropTypes.func.isRequired
  };

  // routeChange() {
  //   let path = `/detail`;
  //   this.props.history.push(path);
  // }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value, page:1 });
  pagePrev = (e) =>{
    e.preventDefault();
    const { search, page } = this.state;
    this.setState({page: this.state.page-1})
    this.props.getClients(search,page-1 );
  }
  pageNext = (e) =>{
    e.preventDefault();
    const { search, page } = this.state;
    this.setState({page: this.state.page+1})
    this.props.getClients(search,page+1 );
  }
  onSearch = (e) => {
    e.preventDefault();
    const { search, page } = this.state;
    this.props.getClients(search,page );
  };
  showModalClient = () => {
    this.setState({ showClient: true });
  };

  hideModalClient = () => {
    this.setState({ showClient: false });
  };

  render() {
    const { search, page  } = this.state;


    // const {NEXT} = 'btn btn-secondary border-secondary bg-primary '+ {...next ? "disabled" : ""}
    // const {PREV} = 'btn btn-secondary border-secondary bg-primary ' + {...prev ? "disabled" : ""}
    return (
      <Fragment>
        <Modal show={this.state.showClient}>
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Dodaj Wizyte
                </h5>
                
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={this.hideModalClient}
                ></button>
              </div>
              <div class="modal-body">
                

                <br />
                <h3>Godzina wizyty: 
                
                </h3>
                <div class="card">
                </div>
                <br />
                <h3>Opis:</h3>
                <textarea
                type="text"
                className="form-control"
                name="description"
                // onChange={this.onChange2}
                // value={description}
              />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={this.hideModalClient}
                >
                  Close
                </button>
                {/* <button 
                  type="button" 
                  class="btn btn-success"
                  onClick={this.Dodaj}
                  >
                  Dodaj
                </button> */}
              </div>
            </Modal>
        <div className="my-4">
          <tr>
            <td>
              <h2>Klienci:</h2>
            </td>
            <td>
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Szukaj"
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
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                {this.props.clientsList.previous  ?
                <button type="button" class='btn btn-secondary border-secondary bg-primary'
                onClick={this.pagePrev}
                >Prev</button>
                : 
                <button type="button" class='btn btn-secondary disabled'
                >Prev</button>
                }
                {this.props.clientsList.next  ?
                <button type="button" class='btn btn-secondary border-secondary bg-primary'
                onClick={this.pageNext}
                >Next</button>
                :
                <button type="button" class='btn btn-secondary border-secondary disabled'
                
                >Next</button>
                }
              </div>
            </td>
          </tr>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <form class="form-inline my-2 my-lg-0">
                    <table></table>
                  </form>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.clientsList.results.map((item) => (
                <tr key={item.id} >
                  <td style={{width: "16%"}} >{item.first_name}</td>
                  <td style={{width: "16%"}}>{item.second_name}</td>
                  <td style={{width: "16%"}}>{item.kod_pocztowy}</td>
                  <td style={{width: "16%"}}>{item.town}</td>
                  <td style={{width: "16%"}}>
                    {item.street} {item.nr_house}
                  </td>
                  <td style={{width: "16%"}}>
                    <Link to="/clientDetail"><button className='btn btn-info btn-sm' onClick={() => (this.props.get_clients_detail(item.id), this.props.getClientEvents(item.id))}>Więcej</button></Link>
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
  clientsList: state.clients.clientsList,
});

export default connect(mapStateToProps, { getClients, get_clients_detail, getClientEvents })(InviteMemberToGroup);
