import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Example() {
  const navigation = useNavigation();
//   const scrollViewRef = useRef();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView 
    //   ref={scrollViewRef}
    //   onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      style={styles.inputContainer}>
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
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.replace("Urzytkownicy:")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text>Sign in?</Text>
        <TouchableOpacity onPress={() => navigation.replace("Urzytkownicy:")}>
          <Text style={styles.buttonOutlineText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainer: {
      width: '80%'
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
      color: 'white',
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
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
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
  })