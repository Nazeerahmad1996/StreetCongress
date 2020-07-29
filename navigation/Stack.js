import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Home from "../Screens/Home";
import Register from "../Screens/Register";
import PhoneLogin from "../Screens/PhoneLogin";
import LeaderBoard from "../Screens/LeaderBoard";
import UserNameUpdate from "../Screens/UsernameUpdate";
import SendAlertsScreen from "../Screens/SendAlertsScreen";

import firebase from "firebase";

//After Login Navigator
export const AppStack = createStackNavigator(
  {
    Username: {
      screen: UserNameUpdate,
    },
    Home: {
      screen: Home,
    },
    LeaderBoard: {
      screen: LeaderBoard,
    },
    SendAlertsScreen: {
      screen: SendAlertsScreen,
    },
  },
  {
    initialRouteName: "Username",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        // backgroundColor: '#5d599',
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  }
);

//Before Login Navigator
export const AuthStack = createStackNavigator(
  {
    Register: {
      screen: Register,
    },
    PhoneLogin: {
      screen: PhoneLogin,
    },
  },
  {
    initialRouteName: "Register",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        // backgroundColor: '#5d599',
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  }
);
