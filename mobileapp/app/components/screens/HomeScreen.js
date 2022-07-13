import { StyleSheet, Text,View, ScrollView ,Button, Modal, TextInput, TouchableOpacity, Alert ,Linking, Platform,Pressable} from "react-native";
import React , {Component}from "react";
import Beers from "./Beers";
import { getMembers, updateMembers } from "../actions/member";
import { loadGroup } from "../actions/group";
import { get_member_user } from "../actions/member";
import { Logout } from "../actions/auth";
import { addWork } from "../actions/works";
import { getChatList } from "../actions/chat";
import { getCalendarDaily, getEvent, updateEvent } from "../actions/calendar";
import { connect } from "react-redux";
import store from "../store";
import PropTypes from "prop-types";
import { DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";



class HomeScreen extends Component {

  state = {
    eventModal: false,
    logoutModal: false,
    EditModal: false,
    workModal: false,
    description_work:"",
    per: ["SS", "NO"],
    permissions: "NO",
    member_id: null

    
   
  };
  

  // componentDidMount(){
  //   store.dispatch(loadGroup());
  //   store.dispatch(get_member_user());
  //   store.dispatch(getCalendarDaily());
  // }
  // componentWillUnmount(){
  //   store.dispatch(loadGroup());
  //   store.dispatch(get_member_user());
  //   store.dispatch(getCalendarDaily());
  // }
  componentDidMount(){
    store.dispatch(getMembers());
    store.dispatch(loadGroup());
    store.dispatch(get_member_user());
    store.dispatch(getCalendarDaily());
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    store.dispatch(getChatList());
    store.dispatch(get_member_user());
    store.dispatch(getCalendarDaily());
  }
  static propTypes = {
    format_day: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    getEvent: PropTypes.func.isRequired,
    Logout: PropTypes.func.isRequired,
    event_detail: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired
  };
  addWork = (e) => {
    const {description_work} = this.state
    const event = this.props.event_detail.id
    const servisant = this.props.event_detail.servisant
    const body = {servisant, event, description_work}
    // console.log(body)
    this.setState({workModal: false, description_work: ""})
    this.props.addWork(body)
  }

  showModal = (data) => {
    this.setState({ eventModal: true });
  };
  hideModal = (e) => {
    this.setState({ eventModal: false });
  };
  hideModalWork = (e) => {
    this.setState({ workModal: false });
  };
  GetEventFunc = (val) => {
    this.props.getEvent(val)
  };
  Done = (val) => {
    const { servisant, data_wizyty, description } = this.props.event_detail
    const body = { 
      servisant,
      data_wizyty,
      description,
      done: true      
    }
    console.log(body)
    this.props.updateEvent(body, this.props.event_detail.id)
    this.setState({eventModal:false})
  }
  noDone = (val) => {
    const { servisant, data_wizyty, description } = this.props.event_detail
    const body = { 
      servisant,
      data_wizyty,
      description,
      done: false      
    }
    console.log(body)
    this.props.updateEvent(body, this.props.event_detail.id)
    this.setState({eventModal:false})
  }
  makeCall = (tel) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${tel}`;
    } else {
      phoneNumber = `telprompt:${tel}`;
    }

    Linking.openURL(phoneNumber);
  };

  render(){
    const {eventModal, logoutModal,EditModal,  workModal, description_work} = this.state
    const {format_day} = this.props
    const permissions = this.state.permissions
    const client = (data) =>(
      <View>
        <Text style={styles.NameText}>{data.first_name}</Text>
        <Text style={styles.textStyle}>{data.town} Ul: {data.street} {data.nr_house}</Text>
        <Text style={styles.textStyle}>tel: {data.tel}</Text>
        {data.stove ?
            <Text style={styles.textStyle}>Piec: {data.stove.name}</Text>
          :
          <></>
        }
      </View>

    )
    const event = (item) => (
      <TouchableOpacity key={item.id} onPress={() =>{this.showModal(), this.GetEventFunc(item.id) }}>

        <View style={!item.done ? styles.events : styles.doneEvent} >
          
          <View>
            <Text style = {styles.TimeText}>{item.godzina_wizyty.substring(0,2)}-{item.godzina_wizyty2.substring(0,2)}</Text>
            {/* {item.client ? 
              <Text>{item.client.first_name}</Text>
              :<></>
          } */}
          </View>
          <View style={styles.leftBox}>
          {item.client ? 
              <View>
                <Text style={styles.NameText}>{item.client.first_name}</Text>
                <Text>{item.client.town} {item.client.street} {item.client.nr_house}</Text>
                <Text style={styles.TelText}>Tel: {item.client.tel}</Text>
              </View>
              :<View></View>
          }
          <View style={{width:"90%"}}>
            <Text style={styles.desc}>Opis: {item.description}</Text>
          </View>
          </View>
          
        </View>
        </TouchableOpacity>
    )
    const bussyEvent = (item) => (
      <TouchableOpacity key={item.id} onPress={() =>{this.showModal(), this.GetEventFunc(item.id) }}>

        <View style={styles.bussyEvents} >
          
          <View >
            <Text style = {styles.BussyText}>{item.description}</Text>
            {/* {item.client ? 
              <Text>{item.client.first_name}</Text>
              :<></>
          } */}
          </View>
          
        </View>
        </TouchableOpacity>
    )
    const memberEdit = (item) =>(
      <View style={{flexDirection:"row", borderWidth:1, margin:5, marginBottom:30}}>
        <Text style={{paddingLeft:10, fontSize:20, paddingTop: 6 }}>{item.person.username}</Text>
        <Text style={{paddingLeft:25, fontSize:12 ,paddingTop: 11}}>{item.date_joined}</Text>
        <Text style={{paddingLeft:20, fontSize:20, paddingTop: 6}}>{item.permissions}</Text>
        <View style={{ margin:2, paddingLeft:15}}>
          <Button title={"Edit"} onPress={()=>this.setState({EditModal:true, member_id: item.id})} />
        </View>
        {/* <Picker
          selectedValue={item.permissions}
          style={{ height: 20, width: 100, paddingLeft:20 }}
          // color = "#f194ff"
          onValueChange={() => {this.props.updateMembers({}, item.id)}
      
          }
      > 
      {this.state.per.map((pr)=>(
        <Picker.Item label={pr} value={pr} />
      ))}
      </Picker> */}
      </View>
    )

  return (
    <View style={{width: '100%',height: '100%'}}>
    <ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModal}
        onRequestClose={() => {
          this.hideModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {this.props.member_user.permissions == "CE" ?
            <View>
              <Text style={{fontSize:22, fontWeight:"bold"}}>Uprawnienia:</Text>
              {this.props.members.map((item)=>(
                memberEdit(item)
              ))}
            </View>
            :
            <></>}
            <Text>Czy chcesz sie wylogować?</Text>
            <View style={{flexDirection:"row"}}>
            <Button 
              style={{margin:10}}
              title="Wyloguj"
              onPress={()=> this.props.Logout()}
            />
            <Button 
              color={"red"}
              title="Zamknij"
              onPress={()=> this.setState({logoutModal:false})}
            />
            </View>
            {/* <Button title="Wyloguj" color="red"></Button> */}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={EditModal}
        onRequestClose={() => {
          this.hideModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={{flexDirection:"row", borderWidth:1, padding:5, margin:1}} >
            <Text style={{flex:1}}>Brak przywilejów dla pracownika, widzi jedynie własny kalendarz oraz naprawy</Text>
            <Pressable
              style={[styles.button,{backgroundColor: "lightblue"}]}
              onPress={()=>{this.setState({EditModal: false}), this.props.updateMembers("NO", this.state.member_id)}}
            >
              <Text style={{paddingTop:5}}>NO</Text>
            </Pressable>
          </View>
          <View style={{flexDirection:"row", borderWidth:1, padding:5, margin:1}} >
            <Text style={{flex:1}}>Pracownik widzi wszytkich kalendarz oraz naprawy innych</Text>
            <Pressable
              style={[styles.button,{backgroundColor: "lightblue"}]}
              onPress={()=>{this.setState({EditModal: false}), this.props.updateMembers("SS", this.state.member_id)}}
            >
              <Text >SS</Text>
            </Pressable>
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose,{marginTop: 10}]}
            onPress={()=>{this.setState({EditModal: false})}}
          >
            <Text >Zamknij</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={eventModal}
            onRequestClose={() => {
              this.hideModal;
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {this.props.event_detail.client ?
                // <></>
                  client(this.props.event_detail.client)
                :
                <></>
              
              }
              
                <Text style={styles.textStyle}>Data: {this.props.event_detail.data_wizyty}</Text>
                {this.props.event_detail.godzina_wizyty ? <Text style={styles.textStyle}>Godzina: {this.props.event_detail.godzina_wizyty.substring(0,2)}-{this.props.event_detail.godzina_wizyty2.substring(0,2)}</Text> : <View></View>}
                <Text></Text>
                <Text>Opis:</Text>
                
                <Text style={styles.textDescription}>{this.props.event_detail.description}</Text>
                {this.props.event_detail.client ?
                // <></>
                <TouchableOpacity onPress={() => this.makeCall(this.props.event_detail.client.tel )} activeOpacity={0.7} style={styles.touchableButton} >
                  <Text style={styles.TextStyle}>Zadzwoń</Text>
                </TouchableOpacity>
                :
                <></>
              
              }
                

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={this.hideModal}
                    >
                      <Text >Zamknij</Text>
                    </Pressable>
                    <View style={{flexDirection:"row", marginTop:20}}>
                      {!this.props.event_detail.done ?
                      <Pressable
                        style={[styles.button]}
                        onPress={this.Done}
                      >
                        <Text >Zrobione</Text>
                      </Pressable>
                      :
                      <Pressable
                        style={[styles.button]}
                        onPress={this.noDone}
                      >
                        <Text > Nie Zrobione</Text>
                      </Pressable>
                      }
                      {this.props.event_detail.bussy ?
                      <Pressable
                        style={[styles.button, styles.buttonWork]}
                        onPress={()=>{this.setState({workModal:true})}}
                      >
                        <Text >Naprawa</Text>
                      </Pressable>
                      :
                      <View></View>}
                    </View>

              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={workModal}
            onRequestClose={() => {
              this.hideModalWork;
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                
                <Text>Opis:</Text>
                <View 
                style={{
                  width:250,
                  // backgroundColor: "red",
                  borderBottomColor: '#000000',
                  borderWidth: 1,
                  
                }}>
                <TextInput
                
                  multiline
                  numberOfLines={4}
                  onChangeText={description_work => this.setState({description_work: description_work})}
                  value={description_work}
                  style={{padding: 10, width:"95%"}}
                ></TextInput>
                </View>
                
                
                <Pressable
                      style={[styles.button, styles.buttonAdd]}
                      onPress={this.addWork}
                    >
                      <Text >Dodaj</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={this.hideModalWork}
                    >
                      <Text >Zamknij</Text>
                    </Pressable>
                    <View style={{flexDirection:"row", marginTop:20}}>
                      
                    </View>

              </View>
            </View>
          </Modal>
      <View style={styles.headerContainer}>
        {this.props.format_day.day ?
        <Text style={styles.headerText}>{this.props.format_day.day[0]} {this.props.format_day.day[1]}</Text>
        :
        <></>}
      </View>
      {this.props.format_day.events.map((item) => (
        <View>
          {item.bussy ? event(item) : bussyEvent(item)}
        </View>
        ))}
        
        {/* {console.log((format_day.events[0]))} */}
        {console.log("wololo")}
        {!this.props.format_day.events[0]
          ?
          <View style={styles.eventsNone}>
            <Text>Brak Wizyt.</Text>
          </View>
          :
          <></>
          }
            
            {/* <Button 
                title="image"
                onPress={this.ChoseImage}
              /> */}
           


    </ScrollView>
    <View style={styles.inputContainer}>
      <Button 
          style={styles.inputContainer}
          title="ustawienia"
          onPress={()=> this.setState({logoutModal: true})}
        />
    </View>
    </View>

  );
}}

const mapStateToProps = (state) => ({
  format_day: state.calendar.format_day,
  event_detail: state.calendar.event_detail,
  isAuthenticated: state.auth.isAuthenticated,                                                                                                                                      
  members: state.member.members,
  member_user: state.member.member_user,

});

export default connect(mapStateToProps,{getCalendarDaily, getEvent, Logout, updateEvent, addWork, getChatList, getMembers, updateMembers})(HomeScreen)
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  headerText: {
    fontSize: 20,
    fontStyle: "italic"
  },
  messageView: {
		backgroundColor: "transparent",
		maxWidth: "80%",
	},
  TimeText: {
    fontSize: 30,
    color: "white"
  },
  BussyText: {
    fontSize: 30,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  touchableButton: {
    width: '80%',
    padding: 10,
    backgroundColor: '#9c27b0',
  },
  TextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  TelText: {
    fontSize: 13,
    color: "white"
  },
  textStyle: {
    fontSize: 20,
    color: "grey"
  },
  textDescription: {
    fontSize: 15,
    color: "grey"
  },
  desc: {
    fontSize: 10,
    color: "black"
  },
  NameText: {
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
      width: '100%',
      height: '100%',
      flex: 1,
     
  //   justifyContent: 'center',
  //   alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  messages: {
      // display: "flex",
      flexDirection: "column",
      // overflow: "auto",
      // bottom:0
  },
  events:{
    width: '100%',
    height: 120,
    backgroundColor: "lightblue",
    marginTop :1,
    borderRadius:10,
    padding:4,
    flexDirection: "row"
  },
  bussyEvents:{
    width: '100%',
    height: 100,
    backgroundColor: "red",
    marginTop :1,
    borderRadius:10,
    padding:4,
    flexDirection: "row"
  },
  inputContainer: {
    // position: "absolute",
    // flexDirection:"row",
    width:"100%",
    // margin: 10,?
    
// right: 40,
// top: 5,
    bottom:0,
},
  doneEvent: {
    width: '100%',
    height: 120,
    backgroundColor: "#a0a01a",
    marginTop :1,
    borderRadius:10,
    padding:4,
    flexDirection: "row"
  },
  eventsNone:{
    width: '100%',
    height: 100,
    backgroundColor: "lightyellow",
    marginTop :1,
    borderRadius:10,
    padding:4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftBox: {
    marginLeft: 15
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#f80000",
  },
  buttonWork: {
    backgroundColor: "#90f880",
  },
  buttonAdd: {
    backgroundColor: "#90ff80",
  },
})
// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { View, Text,StyleSheet, ScrollView, TextInput,TouchableOpacity, Alert } from "react-native";
// import { getChatList } from "../actions/chat";
// import PropTypes from "prop-types";
// import { getCalendar } from "../actions/calendar";
// import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
// import store from "../store";
// import { CALENDAR_MEMBER } from "../actions/types";
// import {Picker} from '@react-native-picker/picker';


// class Calendary extends Component {
    
//   state = {
//     member: "",
//     next_week: 0,
//     prev_week: 0,
//     show: false,
//     date: null,
//     selectedValue: null,
//     tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
//     tableData: [
//         ['1', '2', '3', '4'],
//         ['a', 'b', 'c', 'd'],
//         ['1', '2', '3', '4'],
//         ['a', 'b', 'c', 'd']
//       ]
//   };

//   showModal = () => {
//     this.setState({ show: true });
//   };

//   hideModal = () => {
//     this.setState({ show: false });
//   };
//   static propTypes = {
      
//     user: PropTypes.object.isRequired,
//     calendar_member: PropTypes.object.isRequired,
//     chatList: PropTypes.array.isRequired,
//     getChatList: PropTypes.func.isRequired,
//     getCalendar: PropTypes.func.isRequired,
//   };

//   componentDidMount() {
//     this.props.getChatList();
//     store.dispatch({
//         type: CALENDAR_MEMBER,
//         payload: this.props.user,
//     });
    
//     // this.setState({selectedValue: this.props.user.id})
//   }
//   NextWeek = (e) => {
//     this.setState({ next_week: this.state.next_week + 1 });
//     this.props.getCalendar(
//       this.state.member,
//       this.state.next_week + 1,
//       this.state.prev_week
//     );
//   };
//   PrevWeek = (e) => {
//     this.setState({ prev_week: this.state.prev_week + 1 });
//     this.props.getCalendar(
//       this.state.member,
//       this.state.next_week,
//       this.state.prev_week + 1
//     );
//   };
//   Today = (e) => {
//     this.setState({ prev_week: 0, next_week: 0 });
//     this.props.getCalendar(this.state.member, 0, 0);
//   };

//   onChange = (e) => {
//     this.setState({ member: e.target.value });
//     this.props.getCalendar(
//       e.target.value,
//       this.state.next_week,
//       this.state.prev_week
//     );
//   };
//   // Get = () =>{
//   //   this.props.getCalendar(this.state.member.id,this.state.next_week,this.state.prev_week)
//   // }
//   EventOnMon = (e) => {
//     this.setState({ date: this.props.mon.day });
//     this.showModal();
//   };
//   EventOnTue = (e) => {
//     this.setState({ date: this.props.tue.day });
//     this.showModal();
//   };
//   EventOnWed = (e) => {
//     this.setState({ date: this.props.wed.day });
//     this.showModal();
//   };
//   EventOnThu = (e) => {
//     this.setState({ date: this.props.thu.day });
//     this.showModal();
//   };
//   EventOnFri = (e) => {
//     this.setState({ date: this.props.fri.day });
//     this.showModal();
//   };

//   render() {
//     const { chatList } = this.props;
//     const { selectedValue } = this.state
//     const state = this.state;
//     const element = (data, index) => (
//         <TouchableOpacity onPress={() => this._alertIndex(index)}>
//           <View style={styles.btn}>
//             <Text style={styles.btnText}>button</Text>
//           </View>
//         </TouchableOpacity>
//       );
//     return (
//         <View>
//             <View style={styles.container}>
//                 <Picker
//                     selectedValue={selectedValue}
//                     style={{ height: 50, width: 150 }}
//                     onValueChange={(itemValue, itemIndex) => {this.setState({selectedValue: itemValue})}}
//                 >
//                     <Picker.Item label={this.props.user.username} value={this.props.user.id} />
//                     {chatList.map((item) => (
//                         <Picker.Item label={item.person.username} value={item.person.id} />
//                     ))}
//                 </Picker>
//             </View>
//             <View style={styles.containert}>
//             <Table borderStyle={{borderColor: 'transparent'}}>
//                 <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
//             {
//                 state.tableData.map((rowData, index) => (
//                 <TableWrapper key={index} style={styles.row}>
//                     {
//                     rowData.map((cellData, cellIndex) => (
//                         <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
//                     ))
//                     }
//                 </TableWrapper>
//             ))
//           }
//         </Table>
//             </View>
//             {/* {chatList.map((item) => (
//                 <Text key={item.id}>{item.person.username}</Text>
//             ))} */}
//         </View>
    
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//     user: state.auth.user,
//     chatList: state.chat.chatList,
//     calendar_member: state.calendar.calendar_member,
//     mon: state.calendar.mon,
//     tue: state.calendar.tue,
//     wed: state.calendar.wed,
//     thu: state.calendar.thu,
//     fri: state.calendar.fri,
//     sat: state.calendar.sat,
//     sun: state.calendar.sun,
// });

// export default connect(mapStateToProps, { getChatList, getCalendar })(Calendary);

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingTop: 10,
//       alignItems: "center",
//       height: 80
//     },
//     containert: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//     head: { height: 40, backgroundColor: '#808B97' },
//     text: { margin: 6 },
//     row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
//     btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
//     btnText: { textAlign: 'center', color: '#fff' }
//   });