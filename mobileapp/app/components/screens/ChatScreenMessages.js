import { StyleSheet, Text, ScrollView,TextInput,Image, Button,TouchableHighlight,TouchableOpacity ,Modal, View } from "react-native";
import React, { Component, useRef , Fragment} from "react";
import Beers from "./Beers";
import { loadGroup } from "../actions/group";
import store from "../store";
import { getChatList } from "../actions/chat";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { reloadChatMessages, sendMessage, SendChatGroupMessages }from "../actions/chat";
import { useNavigation } from "@react-navigation/native";
import {
	FlingGestureHandler,
	Directions,
} from "react-native-gesture-handler";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from "axios";
import { ImageModal, Zoom } from "../common/ImageModal";


const navigation = {useNavigation}


// const scrollViewRef = useRef

class ChatMessages extends Component {
    state = {
        message: "",
        image:"",
        moremessages: 50,

        // scroled: true
        // formData: FormData()
    }
  static propTypes = {
    // chatList: PropTypes.array.isRequired,
    // getChatList: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    receiver: PropTypes.object.isRequired,
    reloadChatMessages: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    useRef: PropTypes.func.isRequired
    // scrollViewRef: PropTypes.object.isRequired
  };
//   SendMess =(e)=>{
//       const data = FormData()
//   }
  Send = (e) =>{
    // e.preventDefault();
    const data = new FormData()
    // for (let name in this.state) {
    //   formdata.append(name, this.state[name]); 
    data.append('message', this.state.message);
    // data.append('sender', this.props.user,);
    // data.append('receiver', this.props.receiver);
    // formdata.append("image", this.state.image);
    const body = JSON.stringify({message: this.state.message})
    // }
    // console.log(formdata)
    this.props.sendMessage(
      this.props.user,
      this.props.receiver,
      body
    );
    this.setState({
      message: "",
      image:"",

    });
    }
    SendToGroup = (e) =>{
      // e.preventDefault();
      const data = new FormData()
      // for (let name in this.state) {
      //   formdata.append(name, this.state[name]); 
      data.append('message', this.state.message);
      // data.append('sender', this.props.user,);
      // data.append('receiver', this.props.receiver);
      // formdata.append("image", this.state.image);
      const body = JSON.stringify({message: this.state.message})
      // }
      // console.log(formdata)
      this.props.SendChatGroupMessages(
        this.props.group,
        this.state.moremessages,
        body
      );
      this.setState({
        message: "",
        image:"",
  
      });
      }
  
  componentDidMount() {
    //   console.log(this.props.receiver.id)
    //   console.log(this.props.user.id)
    //   const {receiver , user} = this.props
    //   console.log(receiver) 
    //   console.log(user.id)
    // this.props.reloadChatMessages(user.id, receiver.id, this.state.moremessages);
  }
  ChoseImage = (e) => {
    
    launchImageLibrary({ noData: true }, (response) => {
      console.log(response);
      if (response) {
        this.setState({image: response});
      }
    });
  }
  Change = (e) => {this.setState({[e.name]: e.value})}
  render() {
    // const { navigation }=this.props;
    const {message} = this.state
    // const {messages} = this.props
    // const { useRef } = this.props
    
    return (
        <View
            style={styles.container}
        >
            <View><Text style = {styles.recievierName}>{this.props.receiver.username ? this.props.receiver.username : this.props.receiver.name}:</Text></View>
            <ScrollView
                style={styles.messages}
                // ref={scrollViewRef}
                horizontal={false}
                // pagingEnabled={true}

                ref={ref => {this.scrollView = ref}}
                onContentSizeChange={() => this.scrollView.scrollToEnd({animated: false})}
                // onContentSizeChange={() => this.props.scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                <Button 
                    // style = {styles.buttonText}
                    color="#f194ff"
                    title = "Więcej"
                    // width = '60%'
                    // margin = "10"
                    onPress={() =>{this.setState({moremessages: this.state.moremessages+50}), this.props.reloadChatMessages(this.props.user.id, this.props.receiver.id, this.state.moremessages+50);}}
                ></Button>
                {!this.props.receiver.username ?
                <>
                {this.props.messages.map((item) => (
                  <View>
                    { item.sender.id == this.props.member_user.person.id ?
                      <></>
                      :
                      <Text style={{paddingLeft:15, fontSize:8}}>{item.sender.username}</Text>
                    }
                <View
                key={item.id}
					style={(item.sender.id == this.props.member_user.person.id) ? styles.sender : styles.receiver}
						
					
				> 
        {/* <View><Text>{item.sender.id == this.props.receiver.id ? item.sender.email : item.sender.email}</Text></View> */}
                    
                    
                    {item.sender.id == this.props.member_user.person.id ?
                    <>
                        
                        <View 
                            style={styles.messageView}
                            direction = {Directions.LEFT}
                            >
                                {/* {item.image ? <Image source={{uri: item.image}}/>:<></>} */}
                                {item.image ? <ImageModal image={item.image}/> :<></>}
                           
                            <Text style={[styles.message]}>
                                {item.message}
                            </Text>
                        </View>
                        <View style={styles.timeView}>
                            <Text style={[styles.time]}>
                                {(item.timestamp).substring(11,19)}
                            </Text>
                        </View>
                        </>:
                        <>
                        
                        <View style={styles.timeViewReceiver}>
                            <Text style={[styles.time]}>
                                {(item.timestamp).substring(11,19)}
                            </Text>
                        </View>
                        <View style={styles.messageView}>
                        {/* <Image style={styles.messageimage} source={{uri:"http://192.168.1.107:80/media/grzegorz_braun_BZzbeUn.PNG"}}/> */}
                        {/* {item.image ? <Image style={styles.messageimage} source={{uri: item.image}}/>:<></>} */}
                            <Text style={[styles.message]}>
                                {item.message}
                            </Text>
                        </View>
                        </>
                        }
                  </View>
                  </View>
                ))}
                </>
                :
                <>
                {this.props.messages.map((item) => (
                <View
                key={item.id}
					style={(item.receiver == this.props.receiver.id) ? styles.sender : styles.receiver}
						
					
				> 
        {/* <View><Text>{item.sender.id == this.props.receiver.id ? item.sender.email : item.sender.email}</Text></View> */}
                    
                    
                    {item.receiver == this.props.receiver ?
                    <>
                        
                        <View 
                            style={styles.messageView}
                            direction = {Directions.LEFT}
                            >
                                {/* {item.image ? <Image source={{uri: item.image}}/>:<></>} */}
                                {item.image ? <ImageModal image={item.image}/> :<></>}
                           
                            <Text style={[styles.message]}>
                                {item.message}
                            </Text>
                        </View>
                        <View style={styles.timeView}>
                            <Text style={[styles.time]}>
                                {(item.timestamp).substring(11,19)}
                            </Text>
                        </View>
                        </>:
                        <>
                        
                        <View style={styles.timeViewReceiver}>
                            <Text style={[styles.time]}>
                                {(item.timestamp).substring(11,19)}
                            </Text>
                        </View>
                        <View style={styles.messageView}>
                        {/* <Image style={styles.messageimage} source={{uri:"http://192.168.1.107:80/media/grzegorz_braun_BZzbeUn.PNG"}}/> */}
                        {/* {item.image ? <Image style={styles.messageimage} source={{uri: item.image}}/>:<></>} */}
                            <Text style={[styles.message]}>
                                {item.message}
                            </Text>
                        </View>
                        </>
                        }
				</View>
                ))}
                </>
                }
                
            </ScrollView>
            <View
                style={styles.inputContainer}
            >
            {this.props.receiver.username ?
            <>
              <TextInput
                  placeholder="Message"
                  value={message}
                  name = "message"
                  // onChangeText={} 
                  style={styles.input}
                  // scrollto={true} 
                  onChangeText={message => this.setState({message: message})} 
                  // secureTextEntry
                  />
              <Button 
                  title="Wyślij"
                  onPress={this.Send}
                />
                </>
                :
                <>
              <TextInput
                  placeholder="Message"
                  value={message}
                  name = "message"
                  // onChangeText={} 
                  style={styles.input}
                  // scrollto={true} 
                  onChangeText={message => this.setState({message: message})} 
                  // secureTextEntry
                  />
              <Button 
                  title="Wyślij"
                  onPress={this.SendToGroup}
                />
                </>}
            {/* <Button 
                title="image"
                onPress={this.ChoseImage}
              /> */}
            </View>
            
        </View> 
    );
  }
}

const mapStateToProps = (state) => ({
  // chatList: state.chat.chatList,
  user: state.auth.user,
  receiver: state.chat.receiver,
  messages: state.chat.messages,
  group: state.group.group,
  member_user: state.member.member_user,
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    },
    messages: {
        // display: "flex",
        flexDirection: "column",
        // overflow: "auto",
        // bottom:0
    },
    image:{
      width: 100,
      height: 100
    },
    inputContainer: {
        // position: "absolute",
        flexDirection:"row",
        width:"100%",
        
		// right: 40,
		// top: 5,
        bottom:0,
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
     button: {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
        backgroundColor: 'red',
      fontWeight: '700',
      fontSize: 16,
    },
    recievierName: {
        backgroundColor: 'lightgrey',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    input: {
      backgroundColor: 'white',
      paddingLeft:5,
      flex:1,
      bottom:0,
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
    messageContainer: {
		backgroundColor: "blue",
		maxWidth: "80%",
		alignSelf: "flex-end",
		flexDirection: "row",
		borderRadius: 15,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		paddingTop: 5,
		paddingBottom: 10,
        margin: 0.5
	},
    sender:{
        backgroundColor: "blue",
        flexDirection:"column",
		maxWidth: "80%",
		alignSelf: "flex-end",
		flexDirection: "row",
		borderRadius: 15,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		paddingTop: 5,
		paddingBottom: 10,
        margin: 0.5,
    },
    receiver:{
      flexDirection:"column",

      backgroundColor: "grey",
        // alignItems: "flex-end",
        // backgroundColor: "blue",
      maxWidth: "80%",
      alignSelf: "flex-start",
      flexDirection: "row",
          direction: "rtl",
      borderRadius: 15,
      paddingHorizontal: 10,
      marginHorizontal: 10,
      paddingTop: 5,
      paddingBottom: 10,
      margin: 0.5,
        
    },
    messageimage: {
        width: 220,
        height: 220,
    },
	messageView: {
		backgroundColor: "transparent",
		maxWidth: "80%",
	},
	timeView: {
		backgroundColor: "transparent",
		justifyContent: "flex-end",
		paddingLeft: 10,
	},
    timeViewReceiver: {
		backgroundColor: "transparent",
		justifyContent: "flex-end",
		paddingRight: 10,
	},
	message: {
		color: "white",
		alignSelf: "flex-start",
		fontSize: 15,
	},
	time: {
		color: "lightgray",
		alignSelf: "flex-end",
		fontSize: 10,
	},
  })
  

export default connect(mapStateToProps, { reloadChatMessages, sendMessage,SendChatGroupMessages, navigation, useRef  })(ChatMessages);
// const styles = StyleSheet.create({});
