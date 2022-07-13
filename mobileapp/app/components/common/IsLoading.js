import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigationState } from '@react-navigation/routers';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator;

const IsLoading = ({ component: Component, auth, ...rest })=>(
    <Stack
        {...rest}
        render = {(props) => {
            if(auth.isLoading){
                return <Text>Loading...</Text>;
            }else {
                return <Component {...props} />;
            }
        }}
    
    />
)

const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps)(IsLoading);