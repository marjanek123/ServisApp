import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { get_member_user } from "../actions/member";
import PropTypes from "prop-types";
import { getCalendarDaily, getEvent } from "../actions/calendar";
import store from "../store";
import { Modal } from "react-bootstrap";
import GroupDashboard from "./GroupDashboard";


class GroupAbout extends Component {


  state ={ 
    showModalEvent: false,
  }
  static propTypes = {
    get_member_user: PropTypes.func.isRequired,
    event_detail: PropTypes.object.isRequired,
    getEvent: PropTypes.func.isRequired
  }
  componentDidMount(){
    this.props.get_member_user()
    store.dispatch(getCalendarDaily());
  }
  // showDetailEvent = (e) => {
    
  // }

  hideModal =(e)=> {
    this.setState({showModalEvent: false})
  }




  render() {
    
    // const clientevent = (data) => (
    //   <>
    //     <h3>{data.first_name} {data.second_name}</h3>
    //   </>
    // )
    const {event_detail} = this.props
    const noBussy = (data) => (
      <div class="card">
        <div class="card-body" onClick={() => (this.props.getEvent( data.id), this.setState({showModalEvent: true}))} >
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
        <div class="card-body bg-danger" onClick={() => (this.props.getEvent( data.id), this.setState({showModalEvent: true}))}>
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
      <Fragment>
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
              onClick={this.hideModal}
            ></button>
          </div>
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={this.hideModal}
            >
              Close
            </button>

          </div>
        </Modal>
        <div class="row align-items-start">
        <div class="col-4">
        <table className="table table-bordered border border-2 border border-dark table-hover">
              <thead>
                <tr>
                  <th>
                    
                    {this.props.format_day.day ? <div><i><h4>{this.props.format_day.day[0]}</h4>
                    <small>{this.props.format_day.day[1]}</small></i></div>
                    
                    :
                    <div><h4>Dzień...</h4>
                    <small>...</small></div>
                    }
                  </th>
             
                </tr>
              </thead>
              <tbody>
                {this.props.format_day.events.map((event) => (
                  <tr key={event.id}>
                    <td>
                          {element(event)}  
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div class="col-8">
              <GroupDashboard />
            </div>
            </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  format_day: state.calendar.format_day,
  event_detail: state.calendar.event_detail,
});

export default connect(mapStateToProps, { get_member_user, getCalendarDaily, getEvent })(GroupAbout);
