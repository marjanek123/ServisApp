import { StyleSheet, Text, ScrollView, TouchableHighlight, Button, View } from "react-native";
import React, { Component } from "react";
import Beers from "./Beers";
import { loadGroup } from "../actions/group";
import store from "../store";
import { getChatList } from "../actions/chat";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { navigate } from "@react-navigation/routers/lib/typescript/src/CommonActions";
import { useNavigation } from "@react-navigation/native";
import { getChatMessages, getChatGroupMessages } from "../actions/chat";
const navigation = {useNavigation}

class ChatScreenList extends Component {

  static propTypes = {
    chatList: PropTypes.array.isRequired,
    getChatList: PropTypes.func.isRequired,
    getChatMessages: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

    // receiver: PropTypes.object.isRequired,
    // messages: PropTypes.array.isRequired,
    // sendMessage: PropTypes.func.isRequired,
  };
//   GetChat = (e) => {
//     this.props.getChatMessages.bind(this, this.props.user)
//     this.props.navigation.navigate("Wiad")
//   }
  componentDidMount() {
    store.dispatch(getChatList())
    // console.log(this.props.chatList)
  }
  render() {
    const { navigation }=this.props;
    return (
      <ScrollView>
        {this.props.chatList.map((item) => (
            
                
            <View
                key={item.id}
                style={{ flex: 1, backgroundColor: "red" , margin: "2%"}} 

                >
                {/* <Text>{item.person.id}</Text> */}
                <Button
                title={item.person.username}
                color={item.new_message ? "red": "blue"}
                onPress={() => {this.props.getChatMessages( this.props.user , item.person.id ), navigation.navigate("Wiadomości")}}
                
            />
            </View>
                
        ))}
        <View
            style={{ flex: 1, backgroundColor: "red" , margin: "2%"}} 

            >
            {/* <Text>{item.person.id}</Text> */}
            <Button
            title="wspólny"
            color={"blue"}
            onPress={() => {this.props.getChatGroupMessages( this.props.group.id , 50), navigation.navigate("Wiadomości")}}
            
        />
        </View>
        
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: 110,
        height: 80,
    },
  });
const mapStateToProps = (state) => ({
  chatList: state.chat.chatList,
  group: state.group.group,
  user: state.auth.user,
  // receiver: state.chat.receiver,
  // messages: state.chat.messages,
});

export default connect(mapStateToProps, { getChatList, getChatMessages, getChatGroupMessages, navigation })(ChatScreenList);
// const styles = StyleSheet.create({});
