import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../store";
import { add_stove } from "../actions/stove";
import {
  getWorks,
  getWorksServisant,
  getWorkDetail,
  updateWork,
  deleateWork,
} from "../actions/works";
import { Picker } from "@react-native-picker/picker";
import { WORKS_DETAIL_CLEAR } from "../actions/types";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Linking,
  Platform,
  Pressable,
} from "react-native";

export class Works extends Component {
  state = {
    search: "",
    page: 1,
    modalVisible: false,
    description_work:"",
    first_name: "",
    second_name: "",
    town: "",
    street: "",
    nr_house: "",
    name: "",
    stove: null,
    tel: "",
    edit: false,
    click: false,
  };
  static propTypes = {
    clients_list: PropTypes.object.isRequired,

  };
  componentDidMount() {
    store.dispatch(getWorksServisant())
  }
//   // onChange = (e) => this.setState({ [e.target.name]: e.target.value });
//   showModal = (data) => {
//     this.setState({ modalVisible: true });
//     this.props.get_stove();
//   };
  
  hideModal = (e) => {
    this.setState({ modalVisible: false, description_work: "" });
  };
//   showModal2 = (data) => {
//     this.setState({ modalVisible2: true });
//   };
  showModal = (e) => {
    this.setState({ modalVisible: true });
  };
//   showModal3 = (data) => {
//     this.setState({ modalVisible3: true });
//   };
//   hideModal3 = (e) => {
//     store.dispatch({ type: CLEAR_CLIENTS_DETAIL });
//     this.setState({ modalVisible3: false, edit: false });
//     this.setState({
//       first_name: "",
//       second_name: "",
//       stove: null,
//       town: "",
//       street: "",
//       nr_house: "",
//       tel: "",
//     });
//   };
//   hideModal4 = (e) => {
//     this.setState({ modalVisible4: false });
//   };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
//   makeCall = (tel) => {
//     let phoneNumber = "";

//     if (Platform.OS === "android") {
//       phoneNumber = `tel:${tel}`;
//     } else {
//       phoneNumber = `telprompt:${tel}`;
//     }

//     Linking.openURL(phoneNumber);
//   };
  edit = (e) => {
    this.setState({
      edit: !this.state.edit,
      description_work: this.props.works_detail.description_work
    });
    
  };
//   lastVisits = (e) => {
//     this.props.getClientEvents(this.props.clients_detail.id);
//     this.setState({ modalVisible4: true });
//   };
  save = (e) => {
    this.setState({ modalVisible: false, edit: false });
    const { description_work} =
      this.state;
    const servisant = this.props.works_detail.servisant.id
    const event = this.props.works_detail.event.id

    const body = JSON.stringify({
      description_work,
      servisant,
      event
    });
    this.setState({
      description_work:""
    });
    this.props.updateWork(body, this.props.works_detail.id);
  };
//   deleate = (e) => {
//       this.prop
//   }
//   Search = (e) => {
//     e.preventDefault();
//     const { search, page } = this.state;
//     this.props.get_clients_list(search, page);
//   };
//   pagePrev = (e) => {
//     e.preventDefault();
//     const { search, page } = this.state;
//     this.setState({ page: this.state.page - 1 });
//     this.props.get_clients_list(search, page - 1);
//   };
//   pageNext = (e) => {
//     e.preventDefault();
//     const { search, page } = this.state;
//     this.setState({ page: this.state.page + 1 });
//     this.props.get_clients_list(search, page + 1);
//   };
//   addClient = (e) => {
//     const { first_name, second_name, stove, town, street, nr_house, tel } =
//       this.state;
//     const body = JSON.stringify({
//       first_name,
//       second_name,
//       stove,
//       town,
//       street,
//       nr_house,
//       tel,
//     });
//     console.log(body);
//     this.setState({ modalVisible: false });
//     this.setState({
//       first_name: "",
//       second_name: "",
//       stove: null,
//       town: "",
//       street: "",
//       nr_house: "",
//       tel: "",
//     });
//     this.props.add_client(body);
//   };
//   addStove = (e) => {
//     const { name } = this.state;
//     const body = JSON.stringify({ name });
//     console.log(body);
//     this.setState({ modalVisible2: false });
//     this.setState({ name: "" });
//     this.props.add_stove(body);
//   };
  render() {
    const {modalVisible, description_work, edit, click}= this.state

    const client = (data) =>(
        <View>
          <Text style={styles.NameText}>{data.first_name} {data.second_name}</Text>
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
        <View key={item.id} >
  
          <View style={styles.events} >
            
            <View style={{alignItems:"center"}}>
              <Text style = {styles.TimeText}>{item.data_wizyty}</Text>
              <Text>Godzina:</Text>
              <Text style = {{color:"white", fontWeight:"bold", fontSize:18}}>{item.godzina_wizyty.substring(0,2)}-{item.godzina_wizyty2.substring(0,2)}</Text>
              {/* {item.client ? 
                <Text>{item.client.first_name}</Text>
                :<></>
            } */}
            </View>
            <View style={styles.leftBox}>
            {item.client ? 
                <View>
                  <Text style={styles.NameText}>{item.client.first_name} {item.client.second_name}</Text>
                  <Text>{item.client.town} {item.client.street} {item.client.nr_house}</Text>
                  <Text style={styles.TelText}>Tel: {item.client.tel}</Text>
                  {item.client.stove ? <Text>Piec: {item.client.stove.name}</Text>:<></>}
                </View>
                :<View></View>
            }
            <View style={{width:"90%"}}>
              <Text style={styles.desc}>Opis: {item.description}</Text>
            </View>
            </View>
            
          </View>
          </View>
      )

      const work = (item) => (
        <TouchableOpacity key={item.id} 
        onPress={() =>{this.props.getWorkDetail(item.id),this.showModal()}}
        >
  
          <View 
          style={styles.events }
           >
            
            {/* <View>
              <Text style = {styles.TimeText}>{item.godzina_wizyty.substring(0,5)}</Text>
              {item.client ? 
                <Text>{item.client.first_name}</Text>
                :<></>
            }
            </View> */}
            <View style={styles.leftBox}>
                <Text style={{fontWeight:"bold", fontSize:16}}>{item.event.data_wizyty}</Text>
            {item.event.client ? 
                <View>
                  <Text style={styles.NameText}>{item.event.client.first_name} {item.event.client.second_name}</Text>
                  <Text>{item.event.client.town} {item.event.client.street} {item.event.client.nr_house}</Text>
                  <Text style={styles.TelText}>Tel: {item.event.client.tel}</Text>
                </View>
                :<View></View>
            }
  
            <View style={styles.desc}>
                {item.description_work.length<15 ?
                <Text style={{fontSize:10}}>{item.event.description}</Text>

                :
                <Text style={{fontSize:10}}>{item.event.description.substring(0,15)}...</Text>}
                </View>
            </View>
            <View style={styles.rightBox}>
                <Text style={{fontStyle:"italic", fontWeight:"700"}}>{item.servisant.person.username}</Text>
                {item.description_work.length<50 ?
                <Text>{item.description_work}</Text>

                :
                <Text>{item.description_work.substring(0,50)}...</Text>
        }
            </View>
            
          </View>
          </TouchableOpacity>
      )

    // const event = (item) => (
    //   <View style={styles.events} key={item.id}>
    //     <View>
    //       <Text style={styles.TimeText}>{item.data_wizyty}</Text>
    //       {/* {item.client ? 
    //           <Text>{item.client.first_name}</Text>
    //           :<></>
    //       } */}
    //     </View>
    //     <View style={styles.leftBox}>
    //       {item.servisant ? (
    //         <View>
    //           <Text style={styles.NameText}>
    //             Pracownik: {item.servisant.person.username}
    //           </Text>
    //           <Text style={styles.tekst}>
    //             Godzina: {item.godzina_wizyty.substring(0, 5)}
    //           </Text>
    //           <Text style={styles.tekst}>Opis:</Text>
    //           <Text style={styles.tekst}>{item.description}</Text>
    //           {/* <Text>{item.client.town} {item.client.street} {item.client.nr_house}</Text>
    //             <Text style={styles.TelText}>Tel: {item.client.tel}</Text> */}
    //         </View>
    //       ) : (
    //         <Text>Kliknij by zobaczyć więcej</Text>
    //       )}
    //     </View>
    //   </View>
    // );

    const stoves = (item) => (
      <View>
        {item.stove ? (
          <Text style={styles.tekst}>Piec: {item.stove.name}</Text>
        ) : (
          <></>
        )}
      </View>
    );
    // const client = (item) => (
    //   <View>
    //     {!edit ? (
    //       <View>
    //         <Text style={styles.tekst}>Imie: {item.first_name}</Text>
    //         <Text style={styles.tekst}>Nazwisko: {item.second_name}</Text>
    //         <Text style={styles.tekst}>Miejscowość: {item.town}</Text>
    //         <Text style={styles.tekst}>Ulica: {item.street}</Text>
    //         <Text style={styles.tekst}>Nr: {item.nr_house}</Text>
    //         <Text style={styles.tekst}>Tel: {item.tel}</Text>
    //         {stoves(item)}
    //       </View>
    //     ) : (
    //       <View>
    //         <View style={{ flexDirection: "row" }}>
    //           <Text style={styles.tekst}>Imie: </Text>
    //           <TextInput
    //             // style={styles.search}
    //             placeholder="Imie"
    //             value={first_name}
    //             defaultValue={item.first_name}
    //             name="first_name"
    //             // onChangeText={}
    //             // scrollto={true}
    //             onChangeText={(first_name) =>
    //               this.setState({ first_name: first_name })
    //             }
    //             // secureTextEntry
    //           />
    //         </View>
    //         <View style={{ flexDirection: "row" }}>
    //           <Text style={styles.tekst}>Nazwisko: </Text>
    //           <TextInput
    //             // style={styles.search}
    //             placeholder="Nazwisko"
    //             value={second_name}
    //             defaultValue={item.second_name}
    //             name="second_name"
    //             // onChangeText={}
    //             // scrollto={true}
    //             onChangeText={(second_name) =>
    //               this.setState({ second_name: second_name })
    //             }
    //             // secureTextEntry
    //           />
    //         </View>
    //         <View style={{ flexDirection: "row" }}>
    //           <Text style={styles.tekst}>Miejscowość: </Text>
    //           <TextInput
    //             // style={styles.search}
    //             placeholder="Miejscowość"
    //             value={town}
    //             defaultValue={item.town}
    //             name="town"
    //             // onChangeText={}
    //             // scrollto={true}
    //             onChangeText={(town) => this.setState({ town: town })}
    //             // secureTextEntry
    //           />
    //         </View>
    //         <View style={{ flexDirection: "row" }}>
    //           <Text style={styles.tekst}>Ulica: </Text>
    //           <TextInput
    //             // style={styles.search}
    //             placeholder="Miejscowość"
    //             value={street}
    //             defaultValue={item.street}
    //             name="street"
    //             // onChangeText={}
    //             // scrollto={true}
    //             onChangeText={(street) => this.setState({ street: street })}
    //             // secureTextEntry
    //           />
    //         </View>
    //         <View style={{ flexDirection: "row" }}>
    //           <Text style={styles.tekst}>Nr: </Text>
    //           <TextInput
    //             // style={styles.search}
    //             placeholder="Nr"
    //             value={nr_house}
    //             defaultValue={item.nr_house}
    //             name="nr_house"
    //             // onChangeText={}
    //             // scrollto={true}
    //             onChangeText={(nr_house) =>
    //               this.setState({ nr_house: nr_house })
    //             }
    //             // secureTextEntry
    //           />
    //         </View>
    //         <View style={{ flexDirection: "row" }}>
    //           <Text style={styles.tekst}>Tel: </Text>
    //           <TextInput
    //             // style={styles.search}
    //             placeholder="Tel"
    //             value={tel}
    //             defaultValue={item.tel}
    //             name="tel"
    //             // onChangeText={}
    //             // scrollto={true}
    //             onChangeText={(tel) => this.setState({ tel: tel })}
    //             // secureTextEntry
    //           />
    //         </View>
    //         <Picker
    //           selectedValue={stove}
    //           style={{ height: 50, width: 150 }}
    //           // color = "#f194ff"
    //           onValueChange={(stove) => this.setState({ stove: stove })}
    //         >
    //           <Picker.Item label={"Brak Pieca"} value={null} />
    //           {this.props.stove_list.map((item) => (
    //             <Picker.Item label={item.name} value={item.id} />
    //           ))}
    //         </Picker>
    //       </View>
    //     )}
    //   </View>
    // );
    return (
      <Fragment>
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
                  <View>
                    {this.props.works_detail? event(this.props.works_detail.event):<></>}
                    </View>
                {/* <Text style={{fontSize:22, fontWeight: "bold"}}></Text> */}
                
                <View style={{flex:1, width:"100%"}}>
                <View 
                style={{
                  width:250,
                  // backgroundColor: "red",
                  borderBottomColor: '#000000',
                  borderWidth: 1,
                  marginTop:20,
                  borderRadius:3,
                  
                }}>
                   
                    {edit ? 
                <TextInput
                
                  multiline
                  placeholder="Opis"
                  numberOfLines={4}
                  onChangeText={description_work => this.setState({description_work: description_work})}
                  value={description_work}
                  style={{padding: 10, width:"95%"}}
                ></TextInput>
            :
            <View>{this.props.works_detail ? <Text style={{padding: 35,paddingLeft:10, width:"95%"}} >{this.props.works_detail.description_work}</Text> : <></>}</View>
            }
                </View>
                <View style ={{ marginTop:20}}>
                    {!edit ?
                <Pressable
                  style={[styles.button, styles.buttonEdit]}
                  onPress={this.edit}
                >
                  <Text style={styles.textStyle}>Edytuj</Text>
                </Pressable>
                :
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={this.save}
                >
                  <Text style={styles.textStyle}>Zapisz</Text>
                </Pressable>}
        
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={()=> {this.props.deleateWork(this.props.works_detail.id), this.setState({edit: false, modalVisible: false})}}
                >
                  <Text style={styles.textStyle}>Usuń</Text>
                </Pressable>
                <View style={{paddingTop:20}}>
                <Pressable
                  style={[styles.button, styles.buttonGrey]}
                  onPress={this.hideModal}
                >
                  <Text style={styles.textStyle}>Zamknij</Text>
                </Pressable>
                </View>
                </View>
                {/* {this.props.clients_list.results.map((item) => (
                      <View key={item.id} style={styles.client}>
                          <TouchableOpacity onPress={() => this.choiceClient(item.id)} >
                          <Text style={{color: 'navy'}}>{item.first_name} {item.second_name}</Text>
                          <Text style={{color: 'black'}}>{item.town} {item.street} {item.nr_house} tel: {item.tel}</Text>               
                          </TouchableOpacity>
                      </View>
                      ))
                  } */}
                </View>
                </View>
                
            </View>
          </Modal>
          <View>
          {this.props.member_user.permissions == "CE" || this.props.member_user.permissions == "SS" ?
              <View style={{flexDirection:"row"}}>
              
                    <Pressable
                    
                    style={!click ? styles.avilable : styles.disable}
                      onPress={()=>{this.props.getWorksServisant() , this.setState({click:false})}}
                    >
                        <TouchableOpacity
                            onPress={()=>{this.props.getWorksServisant(), this.setState({click:false})}}
                        >
                    <Text style={[styles.tekst, { color: "white", fontSize: 23 }]}>
                        {"Twoje Naprawy"}
                    </Text>
                    </TouchableOpacity>
                    </Pressable>
                    
            <Pressable
              
              style={click ? styles.avilable : styles.disable}
              onPress={()=>{this.props.getWorks(), this.setState({click:true})}}
            >
                <TouchableOpacity
                onPress={()=>{this.props.getWorks(), this.setState({click:true})}}
                >
              <Text style={[styles.tekst, { color: "white", fontSize: 23 }]}>
                {"Wszystkie"}
              </Text>
              </TouchableOpacity>
            </Pressable>
            
            
          </View>
          :
          <></>}
        </View>
        <ScrollView style={styles.list}>
          {this.props.works_list.map((item) => (
            work(item)
          ))}
          {!this.props.works_list[0]
          ?
          <View style={styles.eventsNone}>
            <Text>Brak Napraw.</Text>
          </View>
          :
          <></>
          }
        </ScrollView>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  works_list: state.works.works_list,
  member_user: state.member.member_user,
  works_detail: state.works.works_detail,
//   clients_detail: state.clients.clients_detail,
//   stove_list: state.stove.stove_list,
//   client_events: state.calendar.clients_events,
//   loading_client_events: state.calendar.loading_client_events,
});
const styles = StyleSheet.create({
  container: {
    // padding: 20,
    backgroundColor: "lightgreen",
    marginTop: 1,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 4,
    flex: 1,
    borderRadius: 5,

    height: 40,
  },
  list: {
    marginTop: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  NameText: {
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "italic",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  leftBox: {
    marginLeft: 5,
    borderWidth:2,
    borderColor:"white",
    // flex:1,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 10,
  },
  TimeText: {
    fontSize: 24,
    color: "white",
  },
  disable: {
    padding: 10,
    elevation: 2,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 1,
    borderRadius: 7,
  },
  desc:{
      fontSize:10,
      width:200
  },

  avilable: {
    padding: 10,
    elevation: 2,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 1,
    borderRadius: 7,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#ff0000",
  },
  buttonEdit: {
    backgroundColor: "#0000ff",
  },
  buttonSave: {
    backgroundColor: "#00ff00",
  },
  buttonAdd: {
    backgroundColor: "#00ff00",
  },
  buttonGrey: {
    backgroundColor: "grey",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    // textAlign: "center",
  },
  labele: {
    flexDirection: "row",
    borderRadius: 100,
    backgroundColor: "lightgrey",
    marginTop: 10,
  },
  touchableButton: {
    // width: '80%',
    justifyContent: "center",
    padding: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#9c27b0",
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
  // textStyle: {
  //   fontSize: 20,
  //   color: "grey"
  // },
  tekst: {
    fontSize: 15,
  },
  search: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },

  cell: { width: 75 },
  containert: {
    paddingTop: 30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  head: { height: 40, backgroundColor: "#808B97" },
  text: { margin: 0, textAlign: "center", fontSize: 12 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  btn: {
    width: "100%",
    height: "100%",
    backgroundColor: "#78B7BB",
    borderRadius: 4,
  },
  btnText: { textAlign: "center", color: "#fff", fontSize: 12 },
  btnTextTime: { textAlign: "center", color: "black", fontSize: 12 },
  btnText2: { textAlign: "center", fontSize: 9 },
  singleHead: { width: 80, height: 40, backgroundColor: "#c8e1ff" },

  TelText: {
    fontSize: 13,
    color: "white",
  },

  textDescription: {
    fontSize: 14,
    color: "grey",
  },
  // NameText: {
  //   fontSize: 25,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  events: {
    // flex: 1,
    width: "100%",
    height: 150,
    margin: 1,
    backgroundColor: "lightgrey",
    marginTop: 1,
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
  },
  rightBox: {
    marginLeft: 5,
    flex:1,
    // backgroundColor: "lightblue",
    padding: 5,
    // borderRadius: 10,
  },
  bussyEvents: {
    width: "100%",
    height: 100,
    backgroundColor: "red",
    marginTop: 1,
    borderRadius: 10,
    padding: 4,
    flexDirection: "row",
  },
  inputContainer: {
    // position: "absolute",
    // flexDirection:"row",
    width: "100%",
    // margin: 10,?

    // right: 40,
    // top: 5,
    bottom: 0,
  },
});

export default connect(mapStateToProps, {getWorksServisant, getWorks, getWorkDetail, updateWork, deleateWork , add_stove})(Works);
