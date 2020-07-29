import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import { StackActions, NavigationActions } from "react-navigation";
const { width, height } = Dimensions.get("window");
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

const SendAlertsScreen = (props) => {
  const [message, setMessage] = useState(null);

  const sendNotificationsToEveryone = async () => {
    if (message) {
      firebase
        .firestore()
        .collection("Users")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((data) => {
            console.log(data.data())
            if (data.exists) {
              let response = fetch("https://exp.host/--/api/v2/push/send", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: data.data().token,
                  sound: "default",
                  title: "Street Congress",
                  body: message,
                }),
              });
            }
          });
        });
    }else{
      alert('text is empty')
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Message</Text>
          <TextInput
            style={styles.input}
            placeholder="Type Your Message Here..."
            onChangeText={(text) => setMessage(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => sendNotificationsToEveryone()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mainView: {
    width,
    justifyContent: "flex-start",
    paddingVertical: height / 8,
    alignItems: "center",
    height: height / 1.3,
  },
  inputContainer: {},
  label: {
    fontSize: 12,
    fontWeight: "300",
    marginLeft: 5,
  },
  input: {
    fontSize: 16,
    padding: 5,
    backgroundColor: "#fff",
    height: 80,
    padding: 20,
    overflow: "scroll",
    marginVertical: 10,
    width: width / 1.1,
    borderRadius: 20,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1.35,
    shadowColor: "#ccc",
  },
  button: {
    width: width / 2.2,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#ff5762",
    borderRadius: 5,
    marginVertical: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});

export default SendAlertsScreen;
