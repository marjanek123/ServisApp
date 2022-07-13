import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes  from "prop-types";
import { getbeer } from '../actions/auth';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
export class Beers extends Component {

    static propTypes = {
        beer: PropTypes.array.isRequired,
        getbeer: PropTypes.func.isRequired,
    
      };
    componentDidMount(){
        this.props.getbeer()
    }
  render() {
    return (
      <>
        {this.props.beer.map((item) => (
    <Text key={item.id}>{item.name}</Text>
            
        ))}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
    beer: state.auth.beer,
  });
  
export default connect(mapStateToProps,{getbeer})(Beers)