import React, { Component } from "react";

import { connect } from "react-redux";
import { getMembers,get_member_user } from "../actions/member";
import PropTypes from "prop-types";
import { getCalendar, addEvent, getEvent, updateEvent, deleateEvent } from "../actions/calendar";
import { Modal } from "react-bootstrap";
import { getClients, get_clients_detail_event } from "../actions/clients";
import store from "../store";
import { CLEAR_CLIENTS_DETAIL_EVENT } from "../actions/types";

class Calendary extends Component {
  state = {
    member: this.props.member_user.id,
    next_week: 0,
    prev_week: 0,
    bussy: true,
    show: false,
    show2: false,
    date: null,
    showModalEvent:false,
    hour:"06:00:00",
    description: "",
    hoursValue: "06",
    minutesValue: "00",
    eventDay: 0,
    search:"",
    page:1,
    edit: false,
    hours:[
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ],
    minutes:[
      "00",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55",
    ],
  };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false, bussy: true });
  };
  
  showModal2 = () => {
    if(this.state.bussy){
      this.setState({ show2: true });
    }
  };
  hideModal3 = () => {
    this.setState({showModalEvent: false, description: "", bussy: true, hour: "06:00:00", edit: false })
    store.dispatch({type: CLEAR_CLIENTS_DETAIL_EVENT})
  }
  static propTypes = {
    members: PropTypes.array.isRequired,
    member_user: PropTypes.object.isRequired,
    getMembers: PropTypes.func.isRequired,
    get_member_user: PropTypes.func.isRequired,
    getCalendar: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
    get_clients_detail_event: PropTypes.func.isRequired,
    getClients: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    deleateEvent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getMembers();
    this.props.get_member_user();
    this.props.getCalendar(this.props.member_user.id, this.state.next_week, this.state.prev_week)
  }
  NextWeek = (e) => {
    this.setState({ next_week: this.state.next_week + 1 });
    this.props.getCalendar(
      this.state.member,
      this.state.next_week + 1,
      this.state.prev_week
    );
  };
  PrevWeek = (e) => {
    this.setState({ prev_week: this.state.prev_week + 1 });
    this.props.getCalendar(
      this.state.member,
      this.state.next_week,
      this.state.prev_week + 1
    );
  };
  Today = (e) => {
    this.setState({ prev_week: 0, next_week: 0 });
    this.props.getCalendar(this.state.member, 0, 0);
  };
  Check = (e) => {
    this.setState({bussy: !this.state.bussy})
    store.dispatch({type: CLEAR_CLIENTS_DETAIL_EVENT})
  }
  
  onChange = (e) => {
    this.setState({ member: e.target.value });
    this.props.getCalendar(
      e.target.value,
      this.state.next_week,
      this.state.prev_week
    );
  };

  onSearch = (e) => {
    e.preventDefault();
    const { search, page } = this.state;
    this.props.getClients(search,page );
    console.log(this.props.clientDetailEvent)
  };
  

  onChange2 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeHours = (e) => {
    const Godzina = e.target.value + this.state.hour.substring(2, 8)
    this.setState({ hour: Godzina});
  };
  onChangeMinutes = (e) => {
    const Minuta = this.state.hour.substring(0, 3) + e.target.value + this.state.hour.substring(5, 8)
    this.setState({ hour: Minuta});
  };
  // Get = () =>{
  //   this.props.getCalendar(this.state.member.id,this.state.next_week,this.state.prev_week)
  // }
  EventOnMon = (e) => {
    this.setState({ date: this.props.mon.day , eventDay:0});
    this.showModal();
  };
  EventOnTue = (e) => {
    this.setState({ date: this.props.tue.day, eventDay:1 });
    this.showModal();
  };
  EventOnWed = (e) => {
    this.setState({ date: this.props.wed.day , eventDay:2});
    this.showModal();
  };
  EventOnThu = (e) => {
    this.setState({ date: this.props.thu.day, eventDay:3});
    this.showModal();
  };
  EventOnFri = (e) => {
    this.setState({ date: this.props.fri.day, eventDay:4 });
    this.showModal();
  };
  DeleateEvent = (e) => {
    this.props.deleateEvent(this.props.event_detail.id)
    this.setState({showModalEvent: false, description: "", bussy: true, hour: "06:00:00",edit: false })
    store.dispatch({type: CLEAR_CLIENTS_DETAIL_EVENT})
  }
  Edit = (e) => {
    const description = this.props.event_detail.description
    const godzina = this.props.event_detail.godzina_wizyty
    const bussy = this.props.event_detail.bussy
    const hoursValue = godzina.substring(0,2)
    const minutesValue = godzina.substring(3,5)
    this.setState({edit: true,description: description, hoursValue: hoursValue, minutesValue: minutesValue, bussy: bussy});
  }
  Save = (e) =>{
    if(this.props.clientDetailEvent) {
      const servisant = this.state.member
      const client = this.props.clientDetailEvent.id
      const { hoursValue, minutesValue, eventDay,bussy, description} = this.state
      const godzina_wizyty = this.state.hour
      const data_wizyty = this.props.event_detail.data_wizyty
      const body = {servisant, client, data_wizyty,  godzina_wizyty, description, bussy}
      this.props.updateEvent(body, this.props.event_detail.id)
      this.setState({showModalEvent: false, description: "", bussy: true, hour: "06:00:00",edit: false })
      store.dispatch({type: CLEAR_CLIENTS_DETAIL_EVENT})
    }else{
      const client = null
      const servisant = this.state.member
    // { this.props.get_clients_detail ? client = this.props.get_clients_detail.id : client = null}
      const { eventDay, date,bussy , description} = this.state
      const data_wizyty = this.props.event_detail.data_wizyty
      const godzina_wizyty = this.state.hour
      const body = {servisant, client, data_wizyty, godzina_wizyty, description, bussy}
      this.props.updateEvent(body, this.props.event_detail.id)
      this.setState({showModalEvent: false, description: "", bussy: true, hour: "06:00:00",edit: false })
      store.dispatch({type: CLEAR_CLIENTS_DETAIL_EVENT})
    }
  }
  Dodaj = (e) => {
    if(this.props.clientDetailEvent) {
      const servisant = this.state.member
      const client = this.props.clientDetailEvent.id
      const { hoursValue, minutesValue, eventDay, description, date, bussy} = this.state
      const data_wizyty = date
      const godzina_wizyty = this.state.hour
      const body = {servisant, client, data_wizyty, godzina_wizyty, description, bussy}
      this.props.addEvent(body, eventDay)
      console.log(body)
      console.log(this.state.hoursValue.type)
      this.setState({show: false, description: "", bussy: true, hour: "06:00:00", })
      store.dispatch({type: CLEAR_CLIENTS_DETAIL_EVENT})
    }else{
      const client = null
      const servisant = this.state.member
    // { this.props.get_clients_detail ? client = this.props.get_clients_detail.id : client = null}
      const { hourValue, minuteValue, eventDay, date, bussy, description} = this.state
      const data_wizyty = date
      const godzina_wizyty = this.state.hour
      const body = {servisant, client, data_wizyty, godzina_wizyty, description, bussy}
      console.log(body)

      this.props.addEvent(body, eventDay)
      this.setState({show: false, description: "", bussy: true, hour: "06:00:00", })
      store.dispatch({type: CLEAR_CLIENTS_DETAIL_EVENT})
    }
  
  }

  render() {
    const { member_user, event_detail } = this.props
    const { member, hoursValue,search , minutesValue , description, bussy} = this.state;

    const client = (event) => (
      <>
      <h5 class="card-title">
        {event.client.first_name} {event.client.second_name}
      </h5>
      <small>{event.client.town}</small>
      <br />
      <small>
        Ul. {event.client.street} {event.client.nr_house}
      </small>
      </>
    )

    const clientevent = (data) => (
      <>
        <h3>{data.first_name} {data.second_name}</h3>
      </>
    )

    const noBussy = (data) => (
      <div class="card">
        <div class="card-body" onClick={() => (this.props.getEvent( data.id), this.setState({showModalEvent: true}))}>
          <h4 style={{textAlign: "center", color: "green"}}>Godz: {data.godzina_wizyty.substring(0,5)}</h4>
          {data.client ? 
          <>
          <h5 class="card-title">
            {data.client.first_name} {data.client.second_name}
          </h5>
          <small>{data.client.town}</small>
          <br />
          <small>
            Ul. {data.client.street} {data.client.nr_house}
          </small>
          </>:
          <small>{data.description}</small>
          }
        </div>
      </div>
          


    )
    const isBussy = (data) => (
      <div class="card">
        <div class="card-body bg-danger" onClick={() => (this.props.getEvent(data.id), this.setState({showModalEvent: true}))}>
          <small>{data.description}</small>
        </div>
      </div>
    )

    
    const element = (data) => (
      <>
        {data.bussy ? noBussy(data) : isBussy(data)}
      </>
    )

    return (
      <div>
        <div class="row justify-content-start m-1">
          <div class="col-4">
            <div class="form-group">
              <label for="exampleFormControlSelect1">
                Kalendarz Urzytkownika:
              </label>
              <select
                class="form-control"
                onChange={this.onChange}
                id="exampleFormControlSelect1"
                name="member"
              >
                <option key={member_user.id} value={member_user.id}>
                  {member_user.person.username}
                </option>
                {this.props.members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.person.username}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div class="col-4">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.PrevWeek}
              >
                <span aria-hidden="true">&laquo;</span>poprzedni
              </button>
              <button
                type="button"
                class="btn btn-warning"
                onClick={this.Today}
              >
                Bieżący tydzień
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.NextWeek}
              >
                następny <span aria-hidden="true">&raquo;</span>
              </button>
            </div>
            <Modal show={this.state.showModalEvent}>
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Wizyta: 
                </h5>
                
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={this.hideModal3}
                ></button>
              </div>
              {!this.state.edit ?
              <div class={event_detail.bussy ? "modal-body": "modal-body bg-danger"}>
                {event_detail.bussy ? <h1>{event_detail.godzina_wizyty.substring(0,5)}</h1>:<></>}
                {event_detail.client ? <div>
                <h2>{event_detail.client.first_name} {event_detail.client.second_name}</h2>
                <h3>{event_detail.client.town} {event_detail.client.street} {event_detail.client.nr_house}</h3>
                <h3>Tel: {event_detail.client.tel}</h3>
                {event_detail.client.stove ? <h6>Piec {event_detail.client.stove.name}</h6>: <></>}
                <hr />
                <p>{event_detail.description}</p>
                </div>
                :
                <>
                <hr />
                <p>{event_detail.description}</p>
                </>
      }
              </div>
              : 
              
              <div class="modal-body">
                
                <h3 style={{textAlign: "center", color: "green"}}> Data{this.state.date}</h3>
                <h5>Termin zajęty? <input type="checkbox" aria-label="Checkbox for following text input" checked={!this.state.bussy} onClick={this.Check}></input></h5>
                <br />
                <h3>Godzina wizyty: 
                <select 
                name="hoursValue" 
                defaultValue={this.state.hoursValue}
                onChange={this.onChangeHours}
                >
                  {this.state.hours.map((hour) => (
                  <option value={hour.toString()}>
                    {hour}
                  </option>
                ))}
                </select>
                    :
                <select 
                name="minutesValue" 
                defaultValue={this.state.minutesValue}
                onChange={this.onChangeMinutes}
                >
                  {this.state.minutes.map((minute) => (
                  <option value={minute.toString()}>
                    {minute}
                  </option>
                ))}
                </select>
                </h3>
                <div class="card">
                  <div 
                  class="card-body" style={this.state.bussy ? {background:"green"} : {background:"lightgrey"}  } 

                  onClick={this.showModal2}
                  >
                    {this.props.clientDetailEvent? clientevent(this.props.clientDetailEvent) : <h4>Brak Klienta</h4>}
                  </div>
                </div>
                <br />
                <h3>Opis:</h3>
                <textarea
                type="text"
                className="form-control"
                name="description"
                onChange={this.onChange2}
                value={description}
              />
              </div>
              }
              
              <div class="modal-footer">
              <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={this.DeleateEvent}
                >
                  Usuń
                </button>
              {this.state.edit ?
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                onClick={this.Save}
              >
                Zapisz
              </button>
              :
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={this.Edit}
              >
                Edytuj
              </button>
              }
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={this.hideModal3}
                >
                  Zamknij
                </button>

              </div>
            </Modal>
            <Modal show={this.state.show}>
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Dodaj Wizyte
                </h5>
                
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={this.hideModal}
                ></button>
              </div>
              <div class="modal-body">
                
                <h3 style={{textAlign: "center", color: "green"}}> Data{this.state.date}</h3>
                <h5>Termin zajęty? <input type="checkbox" aria-label="Checkbox for following text input" checked={!this.state.bussy} onClick={this.Check}></input></h5>
                <br />
                <h3>Godzina wizyty: 
                <select 
                name="hoursValue" 
                onChange={this.onChangeHours}
                >
                  {this.state.hours.map((hour) => (
                  <option value={hour.toString()}>
                    {hour}
                  </option>
                ))}
                </select>
                    :
                <select 
                name="minutesValue" 
                onChange={this.onChangeMinutes}
                >
                  {this.state.minutes.map((minute) => (
                  <option value={minute.toString()}>
                    {minute}
                  </option>
                ))}
                </select>
                </h3>
                <div class="card">
                  <div 
                  class="card-body" style={this.state.bussy ? {background:"green"} : {background:"lightgrey"}  } 

                  onClick={this.showModal2}
                  >
                    {this.props.clientDetailEvent ? clientevent(this.props.clientDetailEvent) : <h4>Brak Klienta</h4>}
                  </div>
                </div>
                <br />
                <h3>Opis:</h3>
                <textarea
                type="text"
                className="form-control"
                name="description"
                onChange={this.onChange2}
                value={description}
              />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={this.hideModal}
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
            <Modal show={this.state.show2}>
              <div class="modal-header" style={{width:"600px"}}>
                <h5 class="modal-title" id="staticBackdropLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.setState({show2: false})}
                ></button>
              </div>
              <div class="modal-body">
                
                <h3 style={{textAlign: "center", color: "green"}}> Klienci</h3>
                <td>
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Szukaj"
                    aria-label="Search"
                    value={search}
                    name="search"
                    onChange={this.onChange2}
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
                      <tr key={item.id} 
                      onClick={() => this.props.get_clients_detail_event(item.id)}>
                        <td>{item.first_name}</td>
                        <td>{item.second_name}</td>
                        <td>{item.kod_pocztowy}</td>
                        <td>{item.town}</td>
                        <td>{item.tel}</td>
                        <td>
                          {item.street} {item.nr_house}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => this.setState({ show2: false  })}
                >
                  Close
                </button>
              </div>
            </Modal>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col">
            <table className="table table-bordered border border-2 border border-dark table-hover">
              <thead>
                <tr>
                  <th onClick={this.EventOnMon} style={{hover:{background:"red"}}}>
                    Poniedziałek
                    <br />
                    <small>{this.props.mon.day}</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.mon.events.map((event) => (
                  <tr key={event.id}>
                    <td>
                          {element(event)}  
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="col">
            <table className="table table-bordered border border-2 border border-dark table-hover">
              <thead>
                <tr>
                  <th onClick={this.EventOnTue}>
                    Wtorek
                    <br />
                    <small>{this.props.tue.day}</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.tue.events.map((event) => (
                  <tr key={event.id}>
                  <td>

                      {element(event)}

                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="col">
            <table className="table table-bordered border border-2 border border-dark table-hover">
              <thead>
                <tr>
                  <th onClick={this.EventOnWed}>
                    Środa
                    <br />
                    <small>{this.props.wed.day}</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.wed.events.map((event) => (
                  <tr key={event.id}>
                  <td>

                      {element(event)}

                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="col">
            <table className="table table-bordered border border-2 border border-dark table-hover">
              <thead>
                <tr>
                  <th onClick={this.EventOnThu}>
                    Czwartek
                    <br />
                    <small>{this.props.thu.day}</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.thu.events.map((event) => (
                  <tr key={event.id}>
                  <td>

                      {element(event)}

                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="col">
            <table className="table table-bordered border border-2 border border-dark table-hover">
              <thead>
                <tr>
                  <th onClick={this.EventOnFri}>
                    Piątek
                    <br />
                    <small>{this.props.fri.day}</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.fri.events.map((event) => (
                  <tr key={event.id}>
                  <td>

                      {element(event)}


                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div class="col">
            <table className="table table-bordered border border-2 border border-dark">
              <thead>
                <tr>
                  <th>Sobota<br/><small>{this.props.sat.day}</small></th>
                </tr>
              </thead>
              <tbody>
                {this.props.sat.events.map( event => (
                  <tr key={event.id}>
                  <td>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{event.client.first_name} {event.client.second_name}</h5>
                        {event.client.town}<br/>
                        Ul. {event.client.street} {event.client.nr_house}<br/>
                        <small class="card-text">Data: {event.data_wizyty}</small><br/>
                        <small class="card-text">Godz: {event.godzina_wizyty}</small><br/>
                        <small class="card-text">{event.description}</small>
                      </div>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            </div> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  members: state.member.members,
  event_detail: state.calendar.event_detail,
  member_user: state.member.member_user,
  clientsList: state.clients.clientsList,
  clientDetailEvent: state.clients.clientDetailEvent,
  mon: state.calendar.mon,
  tue: state.calendar.tue,
  wed: state.calendar.wed,
  thu: state.calendar.thu,
  fri: state.calendar.fri,
  sat: state.calendar.sat,
  sun: state.calendar.sun,
});

export default connect(mapStateToProps, { getMembers, getCalendar, get_member_user, getClients, get_clients_detail_event, addEvent, getEvent, updateEvent, deleateEvent })(Calendary);
