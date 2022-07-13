import React, { Component, useEffect } from "react";
import { NoAuthNav } from "./NoAuthNav";
import { StyleSheet ,AppState,  Text, View, SafeAreaView } from "react-native";
import { AuthNav } from "./AuthNav";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "../store";
import { MUST_LOGIN } from "../actions/types";
import { loadUser, loadUser2 } from "../actions/auth";
import { loadGroup } from "../actions/group";
import { newMessage } from "../actions/chat";
import * as SecureStore from 'expo-secure-store';
class Nav extends Component {
    state = {
      appState: AppState.currentState,
      loaded: false
    };
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      isLoading: PropTypes.bool.isRequired,
      newMessage: PropTypes.func.isRequired
    }

    componentDidMount(){
      // this.pepe = AuthNav(this.props.newmessage)
      store.dispatch(newMessage())
      if(!this.state.loaded){
        {
          console.log()
          setTimeout(async() => {
            // setIsLoading(false);
            let userToken;
            // userToken = null;
            try {
              userToken = await SecureStore.getItemAsync("token");
            } catch(e) {
              console.log("not foung");
            }
            // console.log('user token: ', userToken);
            store.dispatch({ type: 'RETRIEVE_TOKEN', payload: userToken });
            console.log(userToken)
            if(userToken){
              store.dispatch(loadUser2(userToken));
            }else{
              store.dispatch({type: MUST_LOGIN});
            }
          }, 1000);
        }
        // store.dispatch(loadUser2(userToken));
        store.dispatch(loadGroup());
        this.setState({loaded: true})
      }
      // try {
      //   userToken = await SecureStore.getItemAsync("token");
      //   console.log(userToken)
      // } catch(e) {
      //   console.log("not foung");
      // }
      // this.props.loadUser2(userToken)
      this.props.newMessage()
      this.pepe = setInterval(
        () => this.tick(),
        2000
      );
    }

    componentWillUnmount() {
      // clearInterval(this.pepe);
      
    }
  
    tick() {
      // pepe = <AuthNav pop={this.props.newmessage} />
      // AuthNav(this.props.newmessage)
      // console.log(this.props.newmessage)
      // return (
      //   <NavigationContainer>
      //     {/* <Text>Current state is: {this.state.appState}</Text> */}
      //     {!this.props.isAuthenticated ? <NoAuthNav /> : AuthNav(this.props.newmessage)}
      //   </NavigationContainer>
// );
    }

    render() {
      const {newmessage, isLoading}= this.props
        return (
        
          <>
          {!this.props.isLoading ?
            
            <NavigationContainer>
              {!this.props.isAuthenticated ? <NoAuthNav /> :  <AuthNav/>}
            </NavigationContainer>
            :
            
            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22
          }} ><Text>Loading...</Text></View>
            }
          </>
    );
  }
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,                                                                                                                                      
    isLoading: state.auth.isLoading,
    newmessage: state.chat.newmessage
});

export default connect(mapStateToProps,{newMessage, loadUser2})(Nav);
