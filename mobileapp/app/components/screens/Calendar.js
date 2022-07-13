import React, { Component } from "react";
import { connect } from "react-redux";
import App from "./Example2";
import { View, Text,StyleSheet, ScrollView, Button, TextInput, TouchableOpacity , Alert, Modal , Pressable} from "react-native";
import { getMembers } from "../actions/member";
import { get_stove, add_stove } from "../actions/stove";
import { get_clients_list, get_clients_detail, add_client_to_calendar } from "../actions/clients";
import { cellphones } from "../reducers/clients";
import PropTypes from "prop-types";
import { getCalendar, addEvent, deleateEvent, updateEvent, getEvent } from "../actions/calendar";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import store from "../store";
import { CLEAR_CLIENTS_DETAIL, CLEAR_EVENT } from "../actions/types";
import {Picker} from '@react-native-picker/picker';
import SendSMS from 'react-native-sms';
// import SMS form 
import * as SMS from 'expo-sms';
import BouncyCheckbox from "react-native-bouncy-checkbox";



class Calendary extends Component {
    
  state = {
    name:"",
    member: this.props.member_user.id,
    phones: null,
    next_week: 0,
    prev_week: 0,
    show: false,
    date: null,
    selectedValue: null,
    tableHead: ['Pon'],
    tableData: ['1', '2', '3', '4', '4'],
    modalVisible: false,
    modalStove: false,
    modalVisibleClientAdd:false,
    modalVisibleClient: false,
    day:"",
    eventDay: 0,
    page: 1,
    desc: "",
    edit: false,
    showModalEvent:false,
    search:"",
    bussy: true,
    showEvent: false,
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
    hourValue: "06",
    hourValue2: "20",
    minuteValue: "00",
  };

  static propTypes = {
    mon: PropTypes.object.isRequired,
    tue: PropTypes.object.isRequired,
    wed: PropTypes.object.isRequired,
    thu: PropTypes.object.isRequired,
    fri: PropTypes.object.isRequired,
    sat: PropTypes.object.isRequired,
    sun: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    member_user: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
    getCalendar: PropTypes.func.isRequired,
    add_client: PropTypes.func.isRequired,
    clients_list: PropTypes.array.isRequired,
    get_clients_detail: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
    deleateEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,

  };

  componentDidMount() {
    this.props.getMembers();
    this.props.get_stove()
    // store.dispatch({
    //     type: CALENDAR_MEMBER,
    //     payload: this.props.user,
    // });
    // this.setState({})
    this.props.getCalendar(this.props.member_user.id, this.state.next_week, this.state.prev_week)
    
    // this.setState({selectedValue: this.props.user.id})
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
  Reload = (e) => {
    // this.setState({ prev_week: this.state.prev_week + 1 });
    this.props.getCalendar(
      this.state.member,
      this.state.next_week,
      this.state.prev_week
    );
  };
  Today = (e) => {
    this.setState({ prev_week: 0, next_week: 0 });
    this.props.getCalendar(this.state.member, 0, 0);
  };
  cellPhones =(e)=>{
    
  }
  choiceClient = (data) => {
    this.props.get_clients_detail(data)
    this.setState({ modalVisibleClient: false });
  }

  onChange = (e) => {
    this.setState({ member: e.target.value });
    this.props.getCalendar(
      e.target.value,
      this.state.next_week,
      this.state.prev_week
    );
  };
  // Get = () =>{
  //   this.props.getCalendar(this.state.member.id,this.state.next_week,this.state.prev_week)
  // }
  EventOnMon = (e) => {
    this.setState({ date: this.props.mon.day , eventDay: 0});
    this.showModal();
    this.setState({phones: cellphones(this.props.mon.events)})
  };
  EventOnTue = (e) => {
    this.setState({ date: this.props.tue.day, eventDay: 1 });
    this.showModal();
    this.setState({phones: cellphones(this.props.tue.events)})

  };
  EventOnWed = (e) => {
    this.setState({ date: this.props.wed.day, eventDay: 2 });
    this.showModal();
    this.setState({phones: cellphones(this.props.wed.events)})

  };
  EventOnThu = (e) => {
    this.setState({ date: this.props.thu.day, eventDay: 3 });
    this.showModal();
    this.setState({phones: cellphones(this.props.thu.events)})

  };
  EventOnFri = (e) => {
    this.setState({ date: this.props.fri.day, eventDay: 4 });
    this.showModal();
    this.setState({phones: cellphones(this.props.fri.events)})

    
    // this.props.makeSms(["662051956"])
  };
  showModalStove = (e) =>{
    this.setState({modalStove:true})
  }
  addStove = (e) => {
    const { name } = this.state;
    const body = JSON.stringify({ name });
    console.log(body);
    this.setState({ modalStove: false });
    this.setState({ name: "" });
    this.props.add_stove(body);
  };
  Search = (e) => {
    e.preventDefault();
    const { search ,page } = this.state;
    this.props.get_clients_list(search, page);
  };
  addVisit = (e) =>{
    // e.preventDefault();

    if(this.props.clients_detail) {
      const servisant = this.state.member
      const client = this.props.clients_detail.id
      const { hourValue,  eventDay, day, bussy, hourValue2} = this.state
      const description = this.state.desc
      const data_wizyty = day
      const godzina_wizyty = hourValue + ":" + "00" +":"+"00"
      const godzina_wizyty2 = hourValue2 + ":" + "00" +":"+"00"
      const body = {servisant, client, data_wizyty, godzina_wizyty,godzina_wizyty2, description, bussy}
      // console.log(body)
      // console.log(eventDay)
      this.props.addEvent(body, eventDay)
      this.setState({modalVisible: false, desc: "",hourValue:'06', bussy: true, hourValue2:"20" })
      store.dispatch({type: CLEAR_CLIENTS_DETAIL})
    }else{
      const client = null
      const servisant = this.state.member
    // { this.props.get_clients_detail ? client = this.props.get_clients_detail.id : client = null}
      const { hourValue,  eventDay, day, bussy, hourValue2} = this.state
      const description = this.state.desc
      const data_wizyty = day
      const godzina_wizyty = hourValue + ":" + "00" +":"+"00"
      const godzina_wizyty2 = hourValue2 + ":" + "00" +":"+"00"
      const body = {servisant, client, data_wizyty, godzina_wizyty, godzina_wizyty2, description, bussy}
      // console.log(body)
      // console.log(eventDay)
      this.props.addEvent(body, eventDay)
      this.setState({modalVisible: false,hourValue:'06', desc: "", bussy: true, hourValue2:"20" })
      store.dispatch({type: CLEAR_CLIENTS_DETAIL})
    }
  }
  closeStove =(e)=>{
    this.setState({modalStove:false, name:""})
  }
  Edit = (e) => {
    const desc = this.props.event_detail.description
    const godzina = this.props.event_detail.godzina_wizyty
    const godzina2 = this.props.event_detail.godzina_wizyty2
    const bussy = this.props.event_detail.bussy
    const hourValue = godzina.substring(0,2)
    const hourValue2 = godzina2.substring(0,2)
    this.setState({edit: true,desc: desc, hourValue: hourValue,  bussy: bussy, hourValue2:hourValue2});
  }
  DeleateEvent = (e) => {
    this.props.deleateEvent(this.props.event_detail.id)
    this.setState({showModalEvent: false, description: "", bussy: true, hourValue2:"20", hourValue:"06", edit: false })
    store.dispatch({type: CLEAR_CLIENTS_DETAIL})
    store.dispatch({type: CLEAR_EVENT})

  }
  addClient = (e) => {
    const { first_name, stove, town, street, nr_house, tel } = 
      this.state;
    const body = JSON.stringify({
      first_name,
      stove,
      town,
      street,
      nr_house,
      tel,
    });
    console.log(body);
    this.setState({ modalVisibleClientAdd: false, modalVisibleClient:false });
    this.setState({
      first_name: "",
      stove: null,
      town: "",
      street: "",
      nr_house: "",
      tel: "",
    });
    this.props.add_client_to_calendar(body);
  };
  Save = (e) =>{
    if(this.props.clients_detail) {
      const servisant = this.state.member
      const client = this.props.clients_detail.id
      const { hourValue, bussy,hourValue2} = this.state
      const data_wizyty = this.props.event_detail.data_wizyty
      const description = this.state.desc
      const godzina_wizyty = hourValue + ":" + '00' +":"+"00"
      const godzina_wizyty2 = hourValue2 + ":" + '00' +":"+"00"
      const body = {servisant, client, godzina_wizyty, godzina_wizyty2, description, data_wizyty,bussy}
      console.log(body)
      this.props.updateEvent(body, this.props.event_detail.id)
      this.setState({showModalEvent: false, description: "", bussy: true, hourValue: "06",hourValue2: "20", edit: false })
      store.dispatch({type: CLEAR_CLIENTS_DETAIL})
      store.dispatch({type: CLEAR_EVENT})

    }else{
      const client = null
      const servisant = this.state.member
    // { this.props.get_clients_detail ? client = this.props.get_clients_detail.id : client = null}
      const { hourValue, bussy, hourValue2} = this.state
      const description = this.state.desc
      const data_wizyty = this.props.event_detail.data_wizyty
      const godzina_wizyty2 = hourValue2 + ":" + '00' +":"+"00"
      const godzina_wizyty = hourValue + ":" + "00" +":"+"00"
      const body = {servisant, client, godzina_wizyty, godzina_wizyty2, description, data_wizyty, bussy}
      console.log(body)
      this.props.updateEvent(body, this.props.event_detail.id)
      this.setState({showModalEvent: false, description: "", bussy: true, hourValue: "06",hourValue: "20",edit: false })
      store.dispatch({type: CLEAR_CLIENTS_DETAIL})
      store.dispatch({type: CLEAR_EVENT})
    }
  }
  Dod

  showModal = (data) => {
    console.log(this.state.day)
    this.setState({ modalVisible: true, bussy: true });
  };
  hideModal = (data) => {
    this.setState({ modalVisible: false, bussy: true });
    store.dispatch({type: CLEAR_CLIENTS_DETAIL})
  };
  showModal2 = (data) => {
    this.setState({ modalVisibleClient: true });
  };
  hideModal2 = (data) => {
    this.setState({ modalVisibleClient: false });
  };
  hideModal3 = () => {

    this.setState({showModalEvent: false, edit: false, desc: "", hourValue: "06", hourValue2: "20", bussy: true});
    store.dispatch({type: CLEAR_CLIENTS_DETAIL})
    store.dispatch({type: CLEAR_EVENT})

  }

  render() {
    
    const { members, event_detail } = this.props;
    const { member,
      search, 
      modalVisible, 
      bussy , 
      desc, 
      hourValue, 
      hourValue2, 
      modalVisibleClient, 
      showModalEvent, 
      modalVisibleClientAdd, 
      edit , 
      stove,
      first_name,
      modalStove,
      town,
      street,
      nr_house,
      name,
      tel,} = this.state
    const mon = this.props.mon.day
    const state = this.state;
    console.log(this.props.mon.events)
    const noBussy = (data) => (

      <TouchableOpacity key={data.id} onPress={() => {this.setState({showModalEvent: true}), this.props.getEvent(data.id)}}>
        <View style={data.done ? styles.btnDone : styles.btn}>
          {/* <Text style={styles.btnText}>{data.id}</Text> */}
          <Text style={styles.btnTextTime}>{data.godzina_wizyty.substring(0,2)}-{data.godzina_wizyty2.substring(0,2)}</Text>
          {data.client ? 
          <View>
            <Text style={styles.btnText}>{data.client.first_name}</Text>
            {/* <Text style={styles.btnText}>{data.client.second_name}</Text> */}
            <Text style={styles.btnText}>{data.client.town}</Text>
            <Text style={styles.btnText}>{data.client.street} {data.client.nr_house}</Text>
          </View> :
          <Text style={styles.btnText2}>{data.description}</Text>
          }
          
          

        </View>
      </TouchableOpacity>
    )
    const isBussy = (data) => (
      <TouchableOpacity key={data.id} onPress={() => {this.setState({showModalEvent: true}) ,this.props.getEvent(data.id)}}>
        <View style={[styles.btn, {backgroundColor:"red"}]}>
          {/* <Text style={styles.btnText}>{data.id}</Text> */}
          <Text style={styles.btnTextTime}>{data.description}</Text>
        </View>
      </TouchableOpacity>
    )

    
    const element = (data) => (
      <View style={{margin:1}}>
        {data.bussy ? noBussy(data) : isBussy(data)}
      </View>
    )
      
    return (
        <ScrollView style={ styles.conter}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModalEvent}
            onRequestClose={() => {
              this.hideModal;
            }}
          >
            
            <View style={styles.centeredView}>
              
              <View style={styles.modalView}>

          

                <Text style={{fontSize:22, fontWeight: "bold"}}>Wydarzenie:</Text>
                { edit ?
                <View style={{alignItems:"center"}}>
                
                <Text style={styles.modalText}>{this.state.day}</Text>
                <View style={bussy ? { flexDirection: "row", backgroundColor: "lightblue", borderRadius:10 } : { flexDirection: "row", backgroundColor: "lightgrey", borderRadius:10 }}>
                      <Text style={{fontSize:26}}>{"Godzina od    "}</Text>
                      <Picker
                          selectedValue={hourValue}
                          style={{ height: 20, width: 100 }}
                          // color = "#f194ff"
                          onValueChange={(itemValue, itemIndex) => {this.setState({hourValue: itemValue})
                          // console.log(this.props.tue.events)
                          // console.log(this.props.tue.events)
                          }
                      
                          }
                      >
                          {this.state.hours.map((item) => (
                              <Picker.Item label={item} value={item} />
                          ))}
                      
                      </Picker>
                      <Text style={{fontSize:26}}>{"do "}</Text>
                      <Picker
                          selectedValue={hourValue2}
                          style={{ height: 30, width: 100 }}
                          // color = "#f194ff"
                          onValueChange={(itemValue, itemIndex) => {this.setState({hourValue2: itemValue})
                          // console.log(this.props.tue.events)
                          // console.log(this.props.tue.events)
                          }
                      
                          }
                      >
                          {this.state.hours.map((item) => (
                              <Picker.Item label={item} value={item} />
                          ))}
                      
                      </Picker>
                      
                </View>
                <Text style={{fontSize:18}}>Opis:</Text>
                <View 
                style={{
                  width:250,
                  // backgroundColor: "red",
                  borderBottomColor: '#000000',
                  borderWidth: 1,
                  
                }}>
                <TextInput
                  placeholder="Opis"
                  style={{margin:10}}
                  numberOfLines={4}
                  // keyboardType={"numeric"}
                  value={desc}
                  name = "desc"
                  onChangeText={desc => this.setState({desc: desc})} 
                />
                </View>
                <Text style={{fontSize:18}}>Klient:</Text>

                <TouchableOpacity
                  disabled = {!bussy}
                  style={bussy ? [styles.buttonClient,{backgroundColor:"lightblue"}] : styles.buttonOpen}
                  onPress={this.showModal2}
                >
                  {this.props.clients_detail ?
                  <Text style={[styles.textStyle,{fontSize:22}]}>{this.props.clients_detail.first_name}</Text>
                  :  
                  <Text style={[styles.textStyle,{fontSize:22}]}>Wybierz klienta</Text>
                }
                
                  
                </TouchableOpacity>
                </View>
                : 
                <View>
                  {event_detail.bussy ?
                  <View>
                    <Text style={styles.dateText}>Data: {event_detail.data_wizyty}</Text>
                    <Text style={styles.timeText}>Godzina: {event_detail.godzina_wizyty.substring(0,2)}-{event_detail.godzina_wizyty2.substring(0,2)}</Text>
                    
                    {event_detail.client ? 
                      <View>
                        <Text style={styles.textEvent}>{event_detail.client.first_name}</Text>
                        <Text style={styles.textEvent}>{event_detail.client.town} Ul: {event_detail.client.street} {event_detail.client.nr_house}</Text>
                        <Text style={styles.textEvent}>Tel: {event_detail.client.tel}</Text>

                      </View>
                    :
                    <View></View>

                    }

                    <Text style={styles.textEvent}>Opis: {event_detail.description}</Text>
                  </View>
                  
                  :
                  <View style={{backgroundColor:"red", borderRadius:10, margin:10, padding:5}}>
                    <Text style={[styles.dateText, {color:"white"}]}>Data: {event_detail.data_wizyty}</Text>
                    <Text style={{color:"white"}}>Opis: {event_detail.description}</Text>
                  </View>
                  }

                </View>
                }
                <View style={{flexDirection:"row", marginTop:20}}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose,{backgroundColor:"red", width:90}]}
                    onPress={this.DeleateEvent}
                  >
                    <Text style={styles.textStyle}>Usuń</Text>
                  </TouchableOpacity>
                  {!edit? 
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose,{backgroundColor:"blue", width:90}]}
                    onPress={this.Edit}
                  >
                    <Text style={styles.textStyle}>Edytuj</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose,{backgroundColor:"green", width:90}]}
                    onPress={this.Save}
                  >
                    <Text style={styles.textStyle}>Zapisz</Text>
                  </TouchableOpacity>}
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose,{backgroundColor:"grey", width:90}]}
                    onPress={this.hideModal3}
                  >
                    <Text style={styles.textStyle}>Zamknij</Text>
                  </TouchableOpacity>
                </View>
                
                
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.hideModal;
            }}
          >
            
            <View style={styles.centeredView}>
              
              <View style={styles.modalView}>

          

                <Text style={{fontSize:22, fontWeight: "bold"}}>Dodaj Wizyte:</Text>
                <View style={{flexDirection: "row"}}>
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  // text="Zajęty Termin"
                  iconStyle={{ borderColor: "red" }}
                  // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                  onPress={(bussy) => {this.setState({bussy: !bussy}), store.dispatch({type: CLEAR_CLIENTS_DETAIL})}}
                  // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={{fontSize:18}}>zajęty termin</Text>
                </View>
                <Text style={{fontSize:26, margin:9, fontStyle:"italic"}}>{this.state.day}</Text>
                <View style={bussy ? { flexDirection: "row", backgroundColor: "lightblue", borderRadius:10 } : { flexDirection: "row", backgroundColor: "lightgrey", borderRadius:10 }}>
                      <Text style={{fontSize:26}}>{"Godzina od    "}</Text>
                      <Picker
                          selectedValue={hourValue}
                          style={{ height: 20, width: 100 }}
                          // color = "#f194ff"
                          onValueChange={(itemValue, itemIndex) => {this.setState({hourValue: itemValue})
                          // console.log(this.props.tue.events)
                          // console.log(this.props.tue.events)
                          }
                      
                          }
                      >
                          {this.state.hours.map((item) => (
                              <Picker.Item label={item} value={item} />
                          ))}
                      
                      </Picker>
                      <Text style={{fontSize:26}}>{"do"}</Text>
                      <Picker
                          selectedValue={hourValue2}
                          style={{ height: 30, width: 100 }}
                          // color = "#f194ff"
                          onValueChange={(itemValue, itemIndex) => {this.setState({hourValue2: itemValue})
                          // console.log(this.props.tue.events)
                          // console.log(this.props.tue.events)
                          }
                      
                          }
                      >
                          {this.state.hours.map((item) => (
                              <Picker.Item label={item} value={item} />
                          ))}
                      
                      </Picker>
                      
                </View>
                <Text style={{fontSize:18}}>Opis:</Text>
                <View 
                style={{
                  width:250,
                  // backgroundColor: "red",
                  borderBottomColor: '#000000',
                  borderWidth: 1,
                  
                }}>
                <TextInput
                  placeholder="Opis"
                  style={{margin:10}}
                  numberOfLines={4}
                  // keyboardType={"numeric"}
                  value={desc}
                  name = "desc"
                  onChangeText={desc => this.setState({desc: desc})} 
                />
                </View>
                <Text style={{fontSize:18}}>Klient:</Text>

                <TouchableOpacity
                  disabled = {!bussy}
                  style={bussy ? styles.buttonClient : styles.buttonOpen}
                  onPress={this.showModal2}
                >
                  {this.props.clients_detail ?
                  <Text style={[styles.textStyle,{fontSize:22}]}>{this.props.clients_detail.first_name} </Text>
                  :  
                  <Text style={[styles.textStyle,{fontSize:22}]}>Wybierz klienta</Text>
                }
                </TouchableOpacity>
                <View style={{flexDirection:"row", marginTop:20, marginBottom:20}}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose,{backgroundColor:"green", width:100}]}
                    onPress={this.addVisit}
                  >
                    <Text style={styles.textStyle}>Dodaj</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose,{backgroundColor:"red", width:100}]}
                    onPress={this.hideModal}
                  >
                    <Text style={styles.textStyle}>Zamknij</Text>
                  </TouchableOpacity>
                </View>
                {!this.state.phones  ? 
                  <></>
                :

                  <App PHONES = {this.state.phones} />

                  }
                  {/* <Button onPress={()=>console.log(this.state.phones)} title={"sdasd"}/> */}

              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalStove}
            onRequestClose={() => {
              this.setState({modalStove: false});
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Dodaj Piec
                </Text>
                <View style={{ borderWidth: 1, flexDirection:"row", margin:15}}>
                <Text style={[styles.tekst,{ flex: 1, width: "100%", fontSize:26 }]}>Nazwa: </Text>
                <TextInput
                  placeholder="Nazwa"
                  value={name}
                  height={40}
                  backgroundColor={"lightblue"}
                  name="name"
                  style={{paddingLeft:5, flex: 1, width: "100%" }}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(name) => this.setState({ name: name })}
                  // secureTextEntry
                />
              </View >
                <View style={{flexDirection:"row",marginTop:40}}>
                  <Pressable
                    style={[styles.button, styles.buttonAdd,{width:100}]}
                    onPress={this.addStove}
                  >
                    <Text style={styles.textStyle}>Dodaj</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose,{width:100}]}
                    onPress={this.closeStove}
                  >
                    <Text style={styles.textStyle}>Zamknij</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleClientAdd}
          onRequestClose={() => {
            this.setState({modalVisibleClientAdd:false})
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{fontWeight:"bold", fontStyle:"italic", fontSize:26, marginBottom:20}}>Dodaj Klienta</Text>
            <View style={[{ flexDirection: "row", borderWidth:1 },styles.tekst3]}>
                <Text style={[styles.tekst3,{flex:1, width:"100%"}]}>Imie i Nazwisko: </Text>
                <TextInput
                  style={{flex:1, width:"100%"}}
                  placeholder="Imie i Nazwisko"
                  value={first_name}
                  name="first_name"
                  backgroundColor="lightblue"
                  // borderRadius={10}
                  padding={3}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(first_name) =>
                    this.setState({ first_name: first_name })
                  }
                  // secureTextEntry
                />
              </View>
              
              <View style={{ flexDirection: "row", borderWidth:1, marginTop:1 }}>
                <Text style={[{ flex:1, width:"100%"},styles.tekst3]}>Miejscowość: </Text>
                <TextInput
                  style={{flex:1, width:"100%"}}
                  placeholder="Miejscowość"
                  value={town}
                  name="town"
                  backgroundColor="lightblue"
                  // borderRadius={10}
                  padding={3}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(town) => this.setState({ town: town })}
                  // secureTextEntry
                />
              </View>
              <View style={{ flexDirection: "row", borderWidth:1, marginTop:1 }}>
                <Text style={[{ flex:1, width:"100%" },styles.tekst3]}>Ulica: </Text>
                <TextInput
                  style={{flex:1, width:"100%"}}
                  placeholder="Ulica"
                  value={street}
                  name="street"
                  backgroundColor="lightblue"
                  // borderRadius={10}
                  padding={3}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(street) => this.setState({ street: street })}
                  // secureTextEntry
                />
              </View>
              <View style={{ flexDirection: "row", borderWidth:1, marginTop:1 }}>
                <Text style={[{ flex:1, width:"100%" },styles.tekst3]}>Nr: </Text>
                <TextInput
                  style={{flex:1, width:"100%"}}
                  placeholder="Nr"
                  value={nr_house}
                  name="nr_house"
                  backgroundColor="lightblue"
                  // borderRadius={10}
                  padding={3}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(nr_house) =>
                    this.setState({ nr_house: nr_house })
                  }
                  // secureTextEntry
                />
              </View>
              <View style={{ flexDirection: "row", borderWidth:1, marginTop:1 }}>
                <Text style={[{ flex:1, width:"100%" },styles.tekst3]}>Tel: </Text>
                <TextInput
                  style={{flex:1, width:"100%"}}
                  placeholder="+48 000-000-000"
                  value={tel}
                  name="tel"
                  keyboardType="numeric"
                  backgroundColor="lightblue"
                  // borderRadius={10}
                  padding={3}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(tel) => this.setState({ tel: tel })}
                  // secureTextEntry
                />
              </View>
              <View style={{ flexDirection: "column" ,backgroundColor: "lightblue", borderRadius: 10, margin:15}}>
                <Picker
                  selectedValue={stove}
                  style={{ height: 50, width: 200 }}
                  // color = "#f194ff"
                  onValueChange={(stove) => this.setState({ stove: stove })}
                >
                  <Picker.Item label={"Brak Pieca"} value={null} />
                  {this.props.stove_list.map((item) => (
                    <Picker.Item label={item.name} value={item.id} />
                  ))}
                </Picker>
                <Pressable
                  style={[styles.button, styles.buttonAdd,{borderRadius:10, marginTop:10}]}
                  onPress={this.showModalStove}
                >
                  <Text style={styles.textStyle}>Dodaj Piec</Text>
                </Pressable>
              </View>
              <View style={{flexDirection:'row'}}>
                <Pressable
                  style={[styles.button, styles.buttonAdd,{width:100}]}
                  onPress={this.addClient}
                >
                  <Text style={styles.textStyle}>Dodaj</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose, {width:100}]}
                  onPress={()=>this.setState({modalVisibleClientAdd: false})}
                >
                  <Text style={styles.textStyle}>Zamknij</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleClient}
            onRequestClose={() => {
              this.hideModal2;
            }}
          >
            <View style={styles.centeredView}>
              
              <View style={styles.modalView}>
              
                <Text style={{fontSize:22, fontWeight: "bold"}}>Klienci:</Text>
                <TouchableOpacity
                      style={[styles.button, styles.buttonClose, {width:"100%", backgroundColor:"grey"}]}
                      onPress={() => {store.dispatch({type: CLEAR_CLIENTS_DETAIL}) , this.setState({modalVisibleClient: false})}}>

                      <Text style={styles.textStyle}>Bez Klienta</Text>

                  </TouchableOpacity>
                  <TouchableOpacity
                      style={[styles.button, styles.buttonClose, {width:"100%", backgroundColor:"darkgreen"}]}
                      onPress={() => {this.setState({modalVisibleClientAdd: true})}}>

                      <Text style={styles.textStyle}>Dodaj Klienta+</Text>

                  </TouchableOpacity>
                <View style={{flexDirection:"row"}}>
                  <TextInput
                    style={styles.search}
                    placeholder="search"
                    value={search}
                    name = "search"
                    // onChangeText={} 
                    // scrollto={true} 
                    onChangeText={search => this.setState({search: search})} 
                    // secureTextEntry
                    />
                  <TouchableOpacity
                      style={[styles.button, styles.buttonClient]}
                      onPress={this.Search}>

                      <Text style={styles.textStyle}>Szukaj</Text>

                  </TouchableOpacity>
                </View>
                
                <View style={{flex:1, width:"100%"}}>
                {this.props.clients_list.results.map((item) => (
                      <View key={item.id} style={styles.client}>
                          <TouchableOpacity onPress={() => this.choiceClient(item.id)} >
                          <Text style={{color: 'navy'}}>{item.first_name}</Text>
                          <Text style={{color: 'black'}}>{item.town} {item.street} {item.nr_house} tel: {item.tel}</Text>               
                          </TouchableOpacity>
                      </View>
                      ))
                  }
                </View>
                <Button 
                  style={[styles.inputContainer]}
                  title="Zamknij"
                  color={"red"}
                  onPress={()=> this.setState({modalVisibleClient: false})}
                />
                </View>
                
            </View>
          </Modal>
            <View style={styles.container}>
              {this.props.member_user.permissions == "CE" || this.props.member_user.permissions == "SS" ?
                <Picker
                    selectedValue={member}
                    style={{ height: 30, width: 150 }}
                    // color = "#f194ff"
                    onValueChange={(itemValue, itemIndex) => {this.setState({member: itemValue}), this.props.getCalendar(
                        itemValue,
                        this.state.next_week,
                        this.state.prev_week
                      )
                    // console.log(this.props.tue.events)
                    // console.log(this.props.tue.events)
                    }
                
                    }
                >
                    <Picker.Item label={this.props.user.username} value={this.props.member_user.id} />
                    {members.map((item) => (
                        <Picker.Item label={item.person.username} value={item.id} />
                    ))}
                
                </Picker>
                : <Text style={{flex:1, paddingLeft:10}}>{this.props.user.username}</Text>}
                <View style={{flexDirection:"column", paddingLeft:10 }}>
                <View style={{flexDirection:"row", marginRight:5}}>
                <TouchableOpacity>
                <Button 
                    color="blue"
                    width = "20px"
                    title = "<<prev" 
                    onPress={this.PrevWeek}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                <Button 
                    color="green"
                    width = "20px"
                    title = "ten Tydzień" 
                    onPress={this.Today}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                <Button 
                    color="blue"
                    width = "20px"
                    title = "next>>" 
                    onPress={this.NextWeek}
                    />
                </TouchableOpacity>
                
                </View>
                <TouchableOpacity>
                <Button 
                    color="purple"
                    width = "20px"
                    title = "odśwież" 
                    onPress={this.Reload}
                    />
                </TouchableOpacity>
                </View>
                
            </View>

            <View style={styles.containert}>
            <Table borderStyle={{borderColor: 'red'}}>
                {/* {this.props.mon.map()} */}
            <TouchableOpacity onPress={() =>{this.showModal(), this.setState({day: this.props.mon.day, eventDay: 0, phones: cellphones(this.props.mon.events)})}}>
              <Row data={["Pon\n"+this.props.mon.day]} style={styles.head} textStyle={styles.text}/>
              <TableWrapper style={styles.cell}>
                  <Row data="" style={styles.singleHead}/>
                  <TableWrapper style={{flexDirection: 'column'}}>
                      {this.props.mon.events.map( event => (
                          <Cell key={event.id} data={element(event)} textStyle={styles.text}/>
                      ))}
                  {/* <Cell data={element(3)} textStyle={styles.text}/> */}
                  </TableWrapper>
              </TableWrapper>
            </TouchableOpacity>
            </Table>
            <Table borderStyle={{borderColor: 'transparent'}}>
            <TouchableOpacity onPress={() =>{this.showModal(), this.setState({day: this.props.tue.day, eventDay: 1, phones: cellphones(this.props.tue.events)})}}>
              <Row data={["Wto\n"+this.props.tue.day]} style={styles.head} textStyle={styles.text}/>
              <TableWrapper style={styles.cell}>
                  <Row data="" style={styles.singleHead}/>
                  <TableWrapper style={{flexDirection: 'column'}}>
                      {this.props.tue.events.map( event => (
                          <Cell key={event.id} data={element(event)} textStyle={styles.text}/>
                      ))}
                  </TableWrapper>
              </TableWrapper>
            </TouchableOpacity>
            </Table>
            <Table borderStyle={{borderColor: 'transparent'}}>
            <TouchableOpacity onPress={() =>{this.showModal(), this.setState({day: this.props.wed.day, eventDay: 2, phones: cellphones(this.props.wed.events)})}}>
              <Row data={["Śro\n"+this.props.wed.day]} style={styles.head} textStyle={styles.text}/>
              <TableWrapper style={styles.cell}>
                  {/* <Row data="" style={styles.singleHead}/> */}
                  <TableWrapper style={{flexDirection: 'column'}}>
                      {this.props.wed.events.map( event => (
                          <Cell key={event.id} data={element(event)} textStyle={styles.text}/>
                      ))}
                  </TableWrapper>
              </TableWrapper>
            </TouchableOpacity>
            </Table>
            <Table borderStyle={{borderColor: 'transparent'}}>
            <TouchableOpacity onPress={() =>{this.showModal(), this.setState({day: this.props.thu.day, eventDay: 3, phones: cellphones(this.props.thu.events)})}}>
              <Row data={["Czw\n"+this.props.thu.day]} style={styles.head} textStyle={styles.text}/>
              <TableWrapper style={styles.cell}>
                  {/* <Row data="" style={styles.singleHead}/> */}
                  <TableWrapper style={{flexDirection: 'column'}}>
                      {this.props.thu.events.map( event => (
                          <Cell key={event.id} data={element(event)} textStyle={styles.text}/>
                      ))}
                  </TableWrapper>
              </TableWrapper>
            </TouchableOpacity>
            </Table>
            <Table borderStyle={{borderColor: 'transparent'}}>
            <TouchableOpacity onPress={() =>{this.showModal(), this.setState({day: this.props.fri.day, eventDay: 4, phones: cellphones(this.props.fri.events)})}}>
              <Row data={["Pnt\n"+this.props.fri.day]} style={styles.head} textStyle={styles.text}/>
              <TableWrapper style={styles.cell}>
                  {/* <Row data="" style={styles.singleHead}/> */}
                  <TableWrapper style={{flexDirection: 'column'}}>
                      {this.props.fri.events.map( event => (
                          <Cell key={event.id} data={element(event)} textStyle={styles.text}/>
                      ))}
                      {/* <Col data={element(4)} heightArr={[60, 60,60,60,60]} textStyle={styles.text}/> */}
                  </TableWrapper>
              </TableWrapper>
            </TouchableOpacity>
            </Table>
            
            {/* {this.props.mon.events.map( event => (
                <Text key={event.id} textStyle={styles.text}>{event.id}</Text>
            ))} */}
            {/* <View></View> */}
      </View>
            {/* <View style={styles.container}>
                <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        {
                        tableData.map((rowData, index) => (
                            <Row
                            key={index}
                            data={rowData}
                            widthArr={state.widthArr}
                            style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                            textStyle={styles.text}
                            />
                        ))
                        }
                    </Table>
                    </ScrollView>
                </View>
                </ScrollView>
            </View> */}
        </ScrollView>
    
    );
  }
}
const mapStateToProps = (state) => ({
    user: state.auth.user,
    members: state.member.members,
    member_user: state.member.member_user,
    event_detail: state.calendar.event_detail,
    mon: state.calendar.mon,
    tue: state.calendar.tue,
    wed: state.calendar.wed,
    thu: state.calendar.thu,
    fri: state.calendar.fri,
    sat: state.calendar.sat,
    sun: state.calendar.sun,
    clients_list: state.clients.clients_list,
    clients_detail: state.clients.clients_detail,
    stove_list: state.stove.stove_list,
});

export default connect(mapStateToProps, { getMembers, add_client_to_calendar, getCalendar, get_clients_list, get_clients_detail, addEvent, deleateEvent, updateEvent, getEvent, get_stove, add_stove})(Calendary);

const styles = StyleSheet.create({
    container: {
        // flex: 0,
        // paddingTop: 10,
        alignItems: "center",
        flexDirection: "row",
        // paddingTop:20
      },
    client: {
        // flex: 0,
        // paddingTop: 10,
        // flex: 1,
        marginTop:2,
        // width: '90%',
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        borderRadius:5,
        // paddingTop:20
      },
    conter: {
        // width: '100%',
        // height: '100%',
        // flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    centeredView: {

      justifyContent: "center",
      alignItems: "center",
      // marginBottom: 300,
      marginTop:50
    },
    
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      width:"100%",
      height:"100%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonAdd: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: "green",
    },
    buttonClient: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: "lightblue",
    },
    tekst:{
      fontSize:26,
    },
    tekst3:{
      fontSize:20,
    },
    buttonClose: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: "red",
    },
    buttonOpen: {
      borderRadius: 20,
      padding: 10,
      
      elevation: 2,
      backgroundColor: "lightgrey",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    search:{
      flex:1,
      backgroundColor:"lightblue",
      borderRadius:100,
      paddingLeft:10
    },
    modalText: {
      marginBottom: 15,
      paddingTop:16,
      textAlign: "center"
    },
    checkbox: {
      alignSelf: "center",
    },
    dateText: {
      fontSize:26,
      color:"green"
    },
    timeText: {
      fontSize:23,
      color:"#ff00ff"
    },
    textEvent: {
      fontSize:18,

    },
    labele: {
      padding:5,
      flexDirection: "row",
      borderRadius: 100,
      backgroundColor:"lightgrey",
      marginTop:10,
    },
    cell: {width: 75},
    containert: {  paddingTop: 30, flexDirection: "row", width:"100%", justifyContent: "center"},
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 0 , textAlign:"center", fontSize:12},
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: "100%", height: "100%", backgroundColor: '#78B7BB',  borderRadius: 4,},
    btnDone: { width: "100%", height: "100%", backgroundColor: "#a0a01a",  borderRadius: 4,},
    btnText: { textAlign: 'center', color: '#fff',fontSize:12 },
    btnTextTime: { textAlign: 'center', color: 'black',fontSize:12 },
    btnText2: { textAlign: 'center',fontSize:9 },
    singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  });
  
