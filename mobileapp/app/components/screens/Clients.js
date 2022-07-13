import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../store";
import {
  get_clients_detail,
  get_clients_list,
  add_client,
  update_client,
} from "../actions/clients";
import { getClientEvents } from "../actions/calendar";
import { add_stove, get_stove } from "../actions/stove";
import { Picker } from "@react-native-picker/picker";
import { CLEAR_CLIENTS_DETAIL } from "../actions/types";
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

export class Clients extends Component {
  state = {
    search: "",
    page: 1,
    modalVisible: false,
    modalVisible2: false,
    modalVisible3: false,
    modalVisible4: false,
    first_name: "",
    town: "",
    street: "",
    nr_house: "",
    name: "",
    stove: null,
    tel: "",
    edit: false,
  };
  static propTypes = {
    clients_list: PropTypes.object.isRequired,
    stove_list: PropTypes.array.isRequired,
    get_clients_list: PropTypes.func.isRequired,
    add_client: PropTypes.func.isRequired,
    add_stove: PropTypes.func.isRequired,
    get_stove: PropTypes.func.isRequired,
    update_client: PropTypes.func.isRequired,
    clients_events: PropTypes.array.isRequired,
    loading_client_events: PropTypes.bool.isRequired
  };
  componentDidMount() {
    this.props.get_stove();
  }
  // onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  showModal = (data) => {
    this.setState({ modalVisible: true });
    this.props.get_stove();
  };
  hideModal = (e) => {
    this.setState({ modalVisible: false });
  };
  showModal2 = (data) => {
    this.setState({ modalVisible2: true });
  };
  hideModal2 = (e) => {
    this.setState({ modalVisible2: false });
  };
  showModal3 = (data) => {
    this.setState({ modalVisible3: true });
  };
  hideModal3 = (e) => {
    store.dispatch({ type: CLEAR_CLIENTS_DETAIL });
    this.setState({ modalVisible3: false, edit: false });
    this.setState({
      first_name: "",
      stove: null,
      town: "",
      street: "",
      nr_house: "",
      tel: "",
    });
  };
  hideModal4 = (e) => {
    this.setState({ modalVisible4: false });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  makeCall = (tel) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${tel}`;
    } else {
      phoneNumber = `telprompt:${tel}`;
    }

    Linking.openURL(phoneNumber);
  };
  edit = (e) => {
    this.setState({
      edit: !this.state.edit,
      first_name: this.props.clients_detail.first_name,
      town: this.props.clients_detail.town,
      street: this.props.clients_detail.street,
      nr_house: this.props.clients_detail.nr_house,
      tel: this.props.clients_detail.tel,
    });
    if (this.props.clients_detail.stove && this.state.edit == false) {
      this.setState({ stove: this.props.clients_detail.stove.id });
    }
  };
  lastVisits = (e) =>{
    this.props.getClientEvents(this.props.clients_detail.id)
    this.setState({modalVisible4:true})
  }
  save = (e) => {
    this.setState({ modalVisible3: false, edit: false });
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
    this.setState({
      first_name: "",
      stove: null,
      town: "",
      street: "",
      nr_house: "",
      tel: "",
    });
    this.props.update_client(body, this.props.clients_detail.id);
  };
  Search = (e) => {
    e.preventDefault();
    const { search, page } = this.state;
    this.props.get_clients_list(search, page);
  };
  pagePrev = (e) =>{
    e.preventDefault();
    const { search, page } = this.state;
    this.setState({page: this.state.page-1})
    this.props.get_clients_list(search,page-1 );
  }
  pageNext = (e) =>{
    e.preventDefault();
    const { search, page } = this.state;
    this.setState({page: this.state.page+1})
    this.props.get_clients_list(search,page+1 );
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
    this.setState({ modalVisible: false });
    this.setState({
      first_name: "",
      stove: null,
      town: "",
      street: "",
      nr_house: "",
      tel: "",
    });
    this.props.add_client(body);
  };
  addStove = (e) => {
    const { name } = this.state;
    const body = JSON.stringify({ name });
    console.log(body);
    this.setState({ modalVisible2: false });
    this.setState({ name: "" });
    this.props.add_stove(body);
  };
  render() {
    const { clients_detail, loading_client_events } = this.props;
    const {
      search,
      modalVisible,
      edit,
      modalVisible2,
      modalVisible3,
      modalVisible4,
      stove,
      first_name,
      town,
      street,
      nr_house,
      name,
      tel,
    } = this.state;

    const event = (item) => (


        <View style={styles.events} key={item.id} >
          
          <View>
            <Text style = {styles.TimeText}>{item.data_wizyty}</Text>
            {/* {item.client ? 
              <Text>{item.client.first_name}</Text>
              :<></>
          } */}
          </View>
          <View style={styles.leftBox}>
          {item.servisant ? 
              <View>
                <Text style={styles.NameText}>Pracownik: {item.servisant.person.username}</Text>
                <Text style={styles.tekst}>Godzina: {item.godzina_wizyty.substring(0,5)}</Text>
                <Text style={styles.tekst}>Opis:</Text>
                <View style = {{width: "80%"}}>
                  <Text style={{fontSize:10}}>{item.description}</Text>
                </View>
                {/* <Text>{item.client.town} {item.client.street} {item.client.nr_house}</Text>
                <Text style={styles.TelText}>Tel: {item.client.tel}</Text> */}
              </View>
              :<Text>Kliknij by zobaczyć więcej</Text>
          }
          </View>
          
        </View>

    )

    const stoves = (item) => (
      <View>
        {item.stove ? (
          <Text style={styles.tekst}>Piec: {item.stove.name}</Text>
        ) : (
          <></>
        )}
      </View>
    );
    const client = (item) => (
      <View style={{width:"100%"}}>
        {!edit ? (
          <View>
            <Text style={styles.tekst}>Imie: {item.first_name}</Text>
            <Text style={styles.tekst}>Miejscowość: {item.town}</Text>
            <Text style={styles.tekst}>Ulica: {item.street}</Text>
            <Text style={styles.tekst}>Nr: {item.nr_house}</Text>
            <Text style={styles.tekst}>Tel: {item.tel}</Text>
            {stoves(item)}
          </View>
        ) : (
          <View >
            <View style={[{ flexDirection: "row", borderWidth: 1 }, styles.tekst]}>
              <Text style={[styles.tekst, { flex: 1, width: "100%" }]}>Imie i Nazwisko: </Text>
              <TextInput
                style={{ flex: 1, width: "100%" }}
                placeholder="Imie i Nazwisko"
                value={first_name}
                name="first_name"
                backgroundColor="lightblue"
                // borderRadius={10}
                padding={3}
                // onChangeText={}
                // scrollto={true}
                onChangeText={(first_name) => this.setState({ first_name: first_name })} />
            </View><View style={{ flexDirection: "row", borderWidth: 1, marginTop: 1 }}>
                <Text style={[{ flex: 1, width: "100%" }, styles.tekst]}>Miejscowość: </Text>
                <TextInput
                  style={{ flex: 1, width: "100%" }}
                  placeholder="Miejscowość"
                  value={town}
                  name="town"
                  backgroundColor="lightblue"
                  // borderRadius={10}
                  padding={3}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(town) => this.setState({ town: town })} />
              </View><View style={{ flexDirection: "row", borderWidth: 1, marginTop: 1 }}>
                <Text style={[{ flex: 1, width: "100%" }, styles.tekst]}>Ulica: </Text>
                <TextInput
                  style={{ flex: 1, width: "100%" }}
                  placeholder="Ulica"
                  value={street}
                  name="street"
                  backgroundColor="lightblue"
                  // borderRadius={10}
                  padding={3}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(street) => this.setState({ street: street })} />
              </View><View style={{ flexDirection: "row", borderWidth: 1, marginTop: 1 }}>
                <Text style={[{ flex: 1, width: "100%" }, styles.tekst]}>Nr: </Text>
                <TextInput
                  style={{ flex: 1, width: "100%" }}
                  placeholder="Nr"
                  value={nr_house}
                  name="nr_house"
                  backgroundColor="lightblue"
                  // borderRadius={10}
                  padding={3}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(nr_house) => this.setState({ nr_house: nr_house })} />
              </View><View style={{ flexDirection: "row", borderWidth: 1, marginTop: 1 }}>
                <Text style={[{ flex: 1, width: "100%" }, styles.tekst]}>Tel: </Text>
                <TextInput
                  style={{ flex: 1, width: "100%" }}
                  placeholder="+48 000-000-000"
                  value={tel}
                  name="tel"
                  keyboardType="numeric"
                  backgroundColor="lightblue"
                  // borderRadius={10}
                  padding={3}
                  // onChangeText={}
                  // scrollto={true}
                  onChangeText={(tel) => this.setState({ tel: tel })} />
              </View><View style={{ flexDirection: "row", backgroundColor: "lightblue", borderRadius: 10, margin: 10 }}>
                <Picker
                  selectedValue={stove}
                  style={{ height: 50, width:"100%" }}
                  // color = "#f194ff"
                  onValueChange={(stove) => this.setState({ stove: stove })}
                >
                  <Picker.Item label={"Brak Pieca"} value={null} />
                  {this.props.stove_list.map((item) => (
                    <Picker.Item label={item.name} value={item.id} />
                  ))}
                </Picker>
              </View>
            </View>
        )}
      </View>
    );
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
              <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                Dodaj Klienta
              </Text>
              <View style={[{ flexDirection: "row", borderWidth:1 },styles.tekst]}>
                <Text style={[styles.tekst,{flex:1, width:"100%"}]}>Imie i Nazwisko: </Text>
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
                <Text style={[{ flex:1, width:"100%"},styles.tekst]}>Miejscowość: </Text>
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
                <Text style={[{ flex:1, width:"100%" },styles.tekst]}>Ulica: </Text>
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
                <Text style={[{ flex:1, width:"100%" },styles.tekst]}>Nr: </Text>
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
                <Text style={[{ flex:1, width:"100%" },styles.tekst]}>Tel: </Text>
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
              <View style={{ backgroundColor: "lightblue", borderRadius: 10,}}>
                <Picker
                  selectedValue={stove}
                  style={{ height: 50, width: 150 }}
                  // color = "#f194ff"
                  onValueChange={(stove) => this.setState({ stove: stove })}
                >
                  <Picker.Item label={"Brak Pieca"} value={null} />
                  {this.props.stove_list.map((item) => (
                    <Picker.Item label={item.name} value={item.id} />
                  ))}
                </Picker>
              </View>
              <View style={{flexDirection:"row", marginTop:20}}>
                <Pressable
                  style={[styles.button, styles.buttonAdd, {width:100}]}
                  onPress={this.addClient}
                >
                  <Text style={styles.textStyle}>Dodaj</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose, {width:100}]}
                  onPress={this.hideModal}
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
          visible={modalVisible2}
          onRequestClose={() => {
            this.hideModal2;
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
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
              <View style={{flexDirection:"row", marginTop:30}}>
                <Pressable
                  style={[styles.button, styles.buttonAdd, {width:100}]}
                  onPress={this.addStove}
                >
                  <Text style={styles.textStyle}>Dodaj</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose, {width:100}]}
                  onPress={this.hideModal2}
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
          visible={modalVisible3}
          onRequestClose={() => {
            this.hideModal3();
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {margin:0}]}>
              {!edit ? (
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Klient:
                </Text>
              ) : (
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Edytuj Klienta:
                </Text>
              )}
              {/* <View style={styles.labele}> */}
              {clients_detail ? (
                client(clients_detail)
              ) : (
                <Text>Loading...</Text>
              )}

              {/* </View> */}
              {!edit ? (
                <View>
                <Pressable onPress={() => this.makeCall(this.props.clients_detail.tel )} activeOpacity={0.7} style={styles.touchableButton} >
                  <Text style={styles.textStyle}>Zadzwoń</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonEdit]}
                  onPress={this.edit}
                >
                  <Text style={styles.textStyle}>Edytuj</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonAdd]}
                  onPress={this.lastVisits}
                >
                  <Text style={styles.textStyle}>Ostatnie wizyty</Text>
                </Pressable>
                </View>
              ) : (
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={this.save}
                >
                  <Text style={styles.textStyle}>Zapisz</Text>
                </Pressable>
              )}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={this.hideModal3}
              >
                <Text style={styles.textStyle}>Zamknij</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible4}
          // onRequestClose={() => {
          //   this.hideModal3();
          // }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView,{margin:0}]}>
              {!loading_client_events ?
              <ScrollView>
              {this.props.clients_events.map((events)=>(
                event(events)
              ))}
              {!this.props.clients_events[0] ? <Text>Brak wcześniejszych wizyt.</Text>:<View></View>}
              </ScrollView>
              :
              <Text>Loading...</Text>
  }
              <Pressable
                style={[styles.button, styles.buttonEdit]}
                onPress={this.hideModal4}
              >
                <Text style={styles.textStyle}>Zamknij</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.labele}>
          <TextInput
            style={styles.search}
            placeholder="Search"
            value={search}
            name="search"
            // onChangeText={}
            // scrollto={true}
            onChangeText={(search) => this.setState({ search: search, page: 1 })}
            // secureTextEntry
          />
          {/* <Button style={{ borderRadius: 20}} title="szukaj" onPress={this.Search} /> */}
            <Pressable
              style={[{padding: 10, elevation: 2, borderRadius: 100}, styles.buttonAdd]}
              onPress={this.Search}
            >
              <Text style={[styles.tekst,{color:"white"}]}>SZUKAJ</Text>
            </Pressable>
        </View>
        <View style={{flexDirection:"row"}}>
          <View style={{flexDirection:"column", backgroundColor:"lightgrey", marginTop:10, width: "50%"}}>
            <Pressable
                style={[{padding: 10, elevation: 2, backgroundColor:"green",margin:1, borderRadius:7}]}
                onPress={this.showModal}
              >
                <Text style={[styles.tekst,{color:"white"}]}>+Dodaj klienta</Text>
            </Pressable>
            <Pressable
                style={[{padding: 10, elevation: 2, backgroundColor: "cyan",margin:1, borderRadius:7}]}
                onPress={this.showModal2}
              >
                <Text style={[styles.tekst,{color:"white"}]}>+Dodaj Piec</Text>
            </Pressable>
          </View>
          <View style={{flexDirection:"row", backgroundColor:"lightgrey", marginTop:10, width: "50%"}}>
          <Pressable
                disabled={this.props.clients_list.previous===null ? true: false}
                style={this.props.clients_list.previous!==null ? styles.avilable : styles.disable}
                onPress={this.pagePrev}
              >
                <Text style={[styles.tekst,{color:"white", fontSize:23}]}>{"<<prev"}</Text>
            </Pressable>
            <Pressable
                disabled={this.props.clients_list.next===null ? true: false}
                style={this.props.clients_list.next!==null ? styles.avilable : styles.disable}
                onPress={this.pageNext}
              >
                <Text style={[styles.tekst,{color:"white", fontSize:23}]}>{"next>>"}</Text>
            </Pressable>
          </View>
        </View>
        <ScrollView style={styles.list}>
          {this.props.clients_list.results.map((item) => (
            <View key={item.id} style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  this.props.get_clients_detail(item.id), this.showModal3();
                }}
              >
                <Text style={{ color: "navy" }}>
                  {item.first_name} {item.second_name}
                </Text>
                <Text style={{ color: "black" }}>
                  {item.town} {item.street} {item.nr_house} tel: {item.tel}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  clients_list: state.clients.clients_list,
  clients_detail: state.clients.clients_detail,
  stove_list: state.stove.stove_list,
  clients_events: state.calendar.clients_events,
  loading_client_events: state.calendar.loading_client_events,
});
const styles = StyleSheet.create({
  container: {
    // padding: 20,
    backgroundColor: "lightblue",
    marginTop: 1,
    marginLeft:5,
    marginRight:5, 
    paddingLeft:4,
    flex: 1,
    borderRadius:5,

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
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    width:"95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "italic"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  leftBox: {
    marginLeft: 10,
  },
  TimeText: {
    fontSize: 18,
    color: "white"
  },
  disable: {
    padding: 10, 
    elevation: 2, 
    backgroundColor:"grey", 
    justifyContent: "center",
    alignItems: "center",
    flex:1,margin:1, 
    borderRadius:7},

  avilable: {
    padding: 10, 
    elevation: 2, 
    backgroundColor:"blue", 
    justifyContent: "center",
    alignItems: "center",
    flex:1,margin:1, 
    borderRadius:7},
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
    padding:5,
    flexDirection: "row",
    borderRadius: 100,
    backgroundColor:"lightgrey",
    marginTop:10,
  },
  touchableButton: {
    // width: '80%',
    justifyContent: "center",
    padding: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#9c27b0',
  },
  // textStyle: {
  //   fontSize: 20,
  //   color: "grey"
  // },
  tekst: {
    fontSize: 20,
  },
  search: {
    flex: 1,
    paddingLeft:10,
    fontSize: 16
  },
  
  cell: {width: 75},
  containert: {  paddingTop: 30, flexDirection: "row", width:"100%", justifyContent: "center"},
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 0 , textAlign:"center", fontSize:12},
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: "100%", height: "100%", backgroundColor: '#78B7BB',  borderRadius: 4,},
  btnText: { textAlign: 'center', color: '#fff',fontSize:12 },
  btnTextTime: { textAlign: 'center', color: 'black',fontSize:12 },
  btnText2: { textAlign: 'center',fontSize:9 },
  singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },

  TelText: {
    fontSize: 13,
    color: "white"
  },
  
  textDescription: {
    fontSize: 14,
    color: "grey"
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
    marginTop: 22
  },
  events:{
    flex: 1,
    width: '100%',
    height: 150,
    // margin:2,
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
});

export default connect(mapStateToProps, {
  add_stove,
  get_stove,
  get_clients_list,
  get_clients_detail,
  add_client,
  update_client,
  getClientEvents
})(Clients);
