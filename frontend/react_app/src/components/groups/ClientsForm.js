import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMembers } from "../actions/member";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { addClient } from "../actions/clients";
import { get_stove, add_stove } from "../actions/stoves";
import store from "../store";
import { Modal } from "react-bootstrap";
const useStyles = {
  // appBarShift: {
  //   marginTop: theme.spacing(5),
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // scrolling: {
  //   overflowY: 'scroll'
  // }
  divStyle: {
    overflow: "auto",
    display: "flex",
    flexDirection: "column-reverse",
    height: "500px",
    border: "1px solid black",
  },
  mes: {
    textAlign: "left",
  },
};
// import { withRouter } from 'react-router-dom';

class Group extends Component {
  state = {
    first_name: "",
    second_name: "",
    town: "",
    street: "",
    nr_house: "",
    tel:"",
    stove: null,
    name:"",
    showStove: false,
  };

  static propTypes = {
    addClient: PropTypes.func.isRequired,
    add_stove: PropTypes.func.isRequired,
    get_stove: PropTypes.func.isRequired,
    stove_list: PropTypes.array.isRequired,
  };
  componentDidMount() {
    store.dispatch(get_stove())
  }

  // routeChange() {
  //   let path = `/detail`;
  //   this.props.history.push(path);
  // }
  onSubmit = (e) => {
    e.preventDefault();
    const { first_name, second_name, town, street, tel, nr_house,stove } = this.state;
    const client = { first_name, second_name, town, street, nr_house,stove, tel };
    this.props.addClient(client);
    this.setState({
      first_name: "",
      second_name: "",
      town: "",
      street: "",
      nr_house: "",
      tel:"",
    });
  };

  Dodaj = (e) => {
    e.preventDefault();
    const { name } = this.state
    const body = { name };
    this.props.add_stove(body);
    this.setState({name:""})
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { first_name, second_name, town, street,name, nr_house, tel } = this.state;
    return (
      <Fragment>
        <Modal show={this.state.showStove}>
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Dodaj Piec
                </h5>
                
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.setState({showStove: false})}
                ></button>
              </div>
              <div class="modal-body">
                
              <h5>Nazwa Pieca:</h5>
              <input
              type="text"
              class="form-control"
              placeholder="nazwa"
              onChange={this.onChange}
              name="name"
              value={name}
            />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => this.setState({showStove: false})}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  class="btn btn-success"
                  onClick={this.Dodaj}
                  >
                  Dodaj
                </button>
              </div>
            </Modal>
        <h3>Dodaj Kilenta:</h3>
        <form onSubmit={this.onSubmit}>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Imie"
              aria-label="Imie"
              onChange={this.onChange}
              name="first_name"
              value={first_name}
            />
            <span class="input-group-text">:</span>
            <input
              type="text"
              class="form-control"
              placeholder="Nazwisko"
              aria-label="Nazwisko"
              onChange={this.onChange}
              name="second_name"
              value={second_name}
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Miejscowość"
              aria-label="Miejscowość"
              name="town"
              onChange={this.onChange}
              value={town}
            />
            <input
              type="text"
              class="form-control"
              placeholder="Ulica"
              aria-label="Ulica"
              name="street"
              onChange={this.onChange}
              value={street}
            />
            <span class="input-group-text">Nr:</span>
            <input
              type="text"
              class="form-control"
              placeholder="--"
              onChange={this.onChange}
              name="nr_house"
              value={nr_house}
            ></input>
            <span class="input-group-text">Tel:</span>
            <input
              type="text"
              class="form-control"
              placeholder="+48 "
              onChange={this.onChange}
              name="tel"
              value={tel}
            ></input>
          </div>
          <h6>Piec:</h6>
          <div class="input-group mb-3">
          <select
                class="form-control"
                onChange={this.onChange}
                id="exampleFormControlSelect1"
                name="member"
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
            <button className="btn btn-success" onClick={() => this.setState({showStove: true})}>
              Dodaj Piec
            </button>
            </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Dodaj
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  stove_list: state.stoves.stove_list
});


export default connect(mapStateToProps, { addClient, add_stove , get_stove })(withStyles(useStyles)(Group));
