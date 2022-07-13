import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchUsers, addUserToGroup } from "../actions/member";
import { update_client, delete_client } from "../actions/clients";
import { get_stove } from "../actions/stoves";
import { Modal } from "react-bootstrap";
import store from "../store";
import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

class ClientDetail extends Component {
  state = {
    showModal:false,
    edit: false,
    stove: null,
    first_name:"",
    second_name:"",
    town:"",
    street:"",
    nr_house:"",
    tel:"",

  };
  static propTypes = {
    clientDetail: PropTypes.object.isRequired,
    update_client: PropTypes.func.isRequired,
    get_stove: PropTypes.func.isRequired,
  };

  // routeChange() {
  //   let path = `/detail`;
  //   this.props.history.push(path);
  // }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value});
  pagePrev = (e) => {
    e.preventDefault();
    const { search, page } = this.state;
    this.setState({ page: this.state.page - 1 });
    this.props.getClients(search, page - 1);
  };
  componentDidMount(){
      store.dispatch(get_stove())
  }
  pageNext = (e) => {
    e.preventDefault();
    const { search, page } = this.state;
    this.setState({ page: this.state.page + 1 });
    this.props.getClients(search, page + 1);
  };
  onSearch = (e) => {
    e.preventDefault();
    const { search, page } = this.state;
    this.props.getClients(search, page);
  };
  showModalClient = () => {
    this.setState({ showClient: true });
  };

  hideModalClient = () => {
    this.setState({ showClient: false });
  };
  edit = (e) => {
    this.setState({
      edit: !this.state.edit,
      first_name: this.props.clientDetail.first_name,
      second_name: this.props.clientDetail.second_name,
      town: this.props.clientDetail.town,
      street: this.props.clientDetail.street,
      nr_house: this.props.clientDetail.nr_house,
      tel: this.props.clientDetail.tel,
    });
    if (this.props.clientDetail.stove && this.state.edit == false) {
      this.setState({ stove: this.props.clientDetail.stove.id });
    }
  };
  save = (e) => {
    this.setState({edit: false });
    const { first_name, second_name, stove, town, street, nr_house, tel } =
      this.state;
    const body = JSON.stringify({
      first_name,
      second_name,
      stove,
      town,
      street,
      nr_house,
      tel,
    });
    this.setState({
      first_name: "",
      second_name: "",
      stove: null,
      town: "",
      street: "",
      nr_house: "",
      tel: "",
    });
    this.props.update_client(body, this.props.clientDetail.id);
  };

  render() {
    const { clientDetail } = this.props
    const { search, page } = this.state;
    const { first_name, second_name, town, street, nr_house, tel } =this.state;
    const stove = (data) => (
        <>
        {data.stove ? 
        <tr>
            <th>
                 <p>{clientDetail.stove.name}</p> 
            </th>
        </tr>:
        <tr>
        <th>
             <p>Brak Pieca</p> 
        </th>
    </tr>}
        </>
    )
    const client = () =>(
        <>
            {clientDetail ? 
                <div class="card">
                <div class="card-body" 
                // onClick={() => (this.props.getEvent( data.id), this.setState({showModalEvent: true}))}
                >
                
                <h5 class="card-title">
                    {clientDetail.first_name} {clientDetail.second_name}
                </h5>
                <hr/>
                    <h6>{clientDetail.town} {clientDetail.street} {clientDetail.nr_house}</h6>
                <hr/>
                    {stove(clientDetail)}
                <hr />
                <button className="btn btn-danger" onClick={this.edit}>
                    Edytuj
                </button>
                
                </div>
                </div>
                :
            <></>}
            </>
    )
    const editClient = (data) => (

        
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
            <div className="form-group">
              <label>Imie:</label>
              <input
                className="form-control"
                name="first_name"
                onChange={this.onChange}
                value={first_name}
              />
              <label>Nazwisko:</label>
              <input
                className="form-control"
                name="second_name"
                onChange={this.onChange}
                value={second_name}
              />
              <label>Miejscowość:</label>
              <input
                className="form-control"
                name="town"
                onChange={this.onChange}
                value={town}
              />
              <label>Ulica:</label>
              <input
                className="form-control"
                name="street"
                onChange={this.onChange}
                value={street}
              />
              <label>NR:</label>
              <input
                className="form-control"
                name="nr_house"
                onChange={this.onChange}
                value={nr_house}
              />
              <label>NR Telfonu:</label>
              <input
                className="form-control"
                name="tel"
                onChange={this.onChange}
                value={tel}
              />
              <label>Piec:</label>
              <select
                class="form-control"
                onChange={this.onChange}
                id="exampleFormControlSelect1"
                name="stove"
              >
                <option value={null}>
                  Brak Pieca
                </option>
                {this.props.stove_list.map((stove) => (
                  <option key={stove.id} value={stove.id}>
                    {stove.name}
                  </option>
                ))}
            </select>

              <button className="btn btn-success" onClick={this.save}>
                Zapisz
              </button>
              <button className="btn btn-danger" onClick={()=>this.setState({showModal: true})}>
                Usuń
              </button>
              <button className="btn btn-primary" onClick={()=>this.setState({edit: false})}>
                Zamknij
              </button>
            </div>
            {/* <p>
              Dont have an account? <Link to="/register">Register</Link>
            </p> */}
        </div>
    
    )
    const element = (data) => (
        <div class="card">
            <div class="card-body" 
            // onClick={() => (this.props.getEvent( data.id), this.setState({showModalEvent: true}))}
            >
            <h4 style={{textAlign: "center", color: "green"}}>Data: {data.data_wizyty}</h4>
            
            <h5 class="card-title">
                Pracownik:
                <br/>
                <i>{data.servisant.person.username}</i>
            </h5>
            <hr/>
            <small>
                <h6>Godzina:</h6> {data.godzina_wizyty.substring(0,5)}
            </small>
            <hr/>
            <small>
                <h6>Opis: </h6>
                <p>{data.description}</p>
            </small>
            
            </div>
        </div>
    )
    // const {NEXT} = 'btn btn-secondary border-secondary bg-primary '+ {...next ? "disabled" : ""}
    // const {PREV} = 'btn btn-secondary border-secondary bg-primary ' + {...prev ? "disabled" : ""}
    return (
      <Fragment>
        <Modal show={this.state.showModal}>
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Czy napewno chcesz usunąć?
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={()=>this.setState({showModal: false})}
            ></button>
          </div>
            
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={this.hideModalClient}
            >
              Usuń
            </button>
            <Link to="/clients"><button 
                  type="button" 
                  class="btn btn-primary"
                  onClick={()=>this.props.delete_client(clientDetail.id)}
                  >
                  Anuluj
                </button> </Link>
          </div>
        </Modal>
        <div class="row align-items-start">
            
            <div class="col-4">
                {!this.state.edit ? client() : editClient()}
            </div>


            <div class="col-4">
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>
                        Ostatnie Wizyty:
                    </th>
                </tr>
                </thead>
                <tbody>

            {this.props.clients_events.map((event)=>(
                <tr>
                    <th>
                    {element(event)}
                    </th>
                </tr>
            ))}
                </tbody>
            </table>
            </div>   
        </div>
            
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
    clientDetail: state.clients.clientDetail,
    clients_events: state.calendar.clients_events,
    stove_list: state.stoves.stove_list
});

export default connect(mapStateToProps, { update_client ,delete_client, get_stove})(ClientDetail);
