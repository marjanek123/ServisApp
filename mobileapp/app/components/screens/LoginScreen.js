import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useState, Component } from "react";
// import { KeyboardAvoidingView } from '@react-native-web';
import { useNavigation } from "@react-navigation/core";
import { render } from "react-dom";
import { login, loadUser } from "../actions/auth";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import PropTypes  from "prop-types";
import { connect } from "react-redux";
import store from "../store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});

class LoginScreen extends Component {
  state = {
    email: "",
    password:"",
  }
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }
  Change = (e) => {this.setState({[e.name]: e.value})}
  Login = (e) =>{
    // console.log(this.state.email)
    this.props.login(this.state.email, this.state.password)
  }
  componentDidMount(){
    // store.dispatch(loadUser())
  }
  // navigation = useNavigation();
  render(){
    const {email, password}=this.state
    // const {styles} = this.props;
    const { navigation, isAuthenticated } = this.props;
    console.log(isAuthenticated)
    // if(isAuthenticated){
    //   navigation.replace("Home")
    // }
    return (
      <KeyboardAvoidingView
        style={styles.container}
        //   behavior="padding"
      >
        <View style={styles.inputContainer}>
          <Text>Logowanie</Text>
          <TextInput
            placeholder="Email"
            name="email"
            value={email}
            onChangeText={email => this.setState({email: email})}
            // onChange={this.Change}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            name="password"
            value={password}
            onChangeText={password => this.setState({password: password})}
            // onChange = {this.Change}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {this.Login()}}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {/* <Text>No have account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('Register')}>
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    );
  }}

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps,{login})(LoginScreen);

