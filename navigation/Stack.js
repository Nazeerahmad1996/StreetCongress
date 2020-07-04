import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../Screens/Home';
import Register from '../Screens/Register';
import PhoneLogin from '../Screens/PhoneLogin';
import UsernameUpdate from '../Screens/UsernameUpdate';
import LeaderBoard from '../Screens/LeaderBoard';

import * as firebase from 'firebase';
import Loader from '../Screens/Loader'

//After Login Navigator
const AppStack = createStackNavigator({
    UsernameUpdate: {
        screen: UsernameUpdate,
      },
    Home: {
      screen: Home,
    },
    LeaderBoard: {
      screen: LeaderBoard,
    }
},{
    initialRouteName: 'UsernameUpdate',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#5d599',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
});

//Before Login Navigator
const AuthStack = createStackNavigator({
    Register: {
    screen: Register,
  },
  PhoneLogin: {
    screen: PhoneLogin
  },
},{
    initialRouteName: 'Register',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#5d599',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
}

);


export default createAppContainer(
  createSwitchNavigator(
    {
      Load: Loader,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Load',
    }
  )
);