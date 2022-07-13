import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { Component } from "react";
import { useNavigation } from "@react-navigation/core";
import { register } from "../actions/auth";
import PropTypes from "prop-types"



class RegisterScreen extends Component {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [username, setUsername] = useState('')
  state = {
    username:'',
    email:"",
    password:"",
  }
  static propTypes = {
    navigation: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }

  render() {
    const { navigation, isAuthenticated }=this.props;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            // value={}
            // onChangeText={}
            style={styles.input}
          />
          <TextInput
            placeholder="Username"
            // value={}
            // onChangeText={}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Password"
            // value={}
            // onChangeText={}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.replace("Home")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <Text>Sign in?</Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.buttonOutlineText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
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
