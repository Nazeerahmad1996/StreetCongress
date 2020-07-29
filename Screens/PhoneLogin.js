import * as React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

var firebaseConfig = {
  apiKey: "AIzaSyD6jwToBOeNvfNhvcCWt4-0F8flrYgAWyk",
  authDomain: "streetcongress-c6ece.firebaseapp.com",
  databaseURL: "https://streetcongress-c6ece.firebaseio.com",
  projectId: "streetcongress-c6ece",
  storageBucket: "streetcongress-c6ece.appspot.com",
  messagingSenderId: "788694505026",
  appId: "1:788694505026:web:b0fe674e67beec357bbfdb",
};

export default function App(props) {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text:
            "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <View style={{ paddingTop: StatusBar.currentHeight, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f2f2' }}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{ padding: 8, backgroundColor: '#4863A0', width: 60, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name='md-arrow-back' color='#fff' size={35} />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Phone Login</Text>
                <View style={{ width: 60 }} />
            </View> */}
      <View style={{ margin: 20 }}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Text style={{ marginTop: 20 }}>Enter phone number</Text>
        <TextInput
          style={{ marginVertical: 10, fontSize: 17 }}
          placeholder="999 999 9999"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          maxLength={13}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        <Button
          title="Send Verification Code"
          disabled={!phoneNumber}
          onPress={async () => {
            console.log(phoneNumber);
            let number = (await "") + "+1" + phoneNumber.toString();
            try {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              const verificationId = await phoneProvider.verifyPhoneNumber(
                number,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId).then((res) => {
                console.log(res);
                // var user = .currentUser.uid;
                // const db = firebase.firestore();
                // db.collection("Users").doc(user).set({
                //     Score: 0,
                // });
                db.collection("Users")
                  .doc(user)
                  .get()
                  .then(function (doc) {
                    let that = this;
                    if (doc.exists) {
                    } else {
                    }
                  })
                  .catch(function (error) {
                    console.log("Error getting document:", error);
                  });
              });
              alert("Verification code has been sent to your phone.");
            } catch (err) {
              console.log(err);
              // showMessage({ text: `Error: ${err.message}`, color: "red" });
            }
          }}
        />
        <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
        <TextInput
          style={{ marginVertical: 10, fontSize: 17 }}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
        />
        <Button
          title="Confirm Verification Code"
          disabled={!verificationId}
          onPress={async () => {
            try {
              const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              await firebase.auth().signInWithCredential(credential);
              showMessage({ text: "Phone authentication successful 👍" });
              // props.navigation.navigate("UsernameUpdate")
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: "red" });
            }
          }}
        />
        {message ? (
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 0xffffffee, justifyContent: "center" },
            ]}
            onPress={() => showMessage(undefined)}
          >
            <Text
              style={{
                color: message.color || "blue",
                fontSize: 17,
                textAlign: "center",
                margin: 20,
              }}
            >
              {message.text}
            </Text>
          </TouchableOpacity>
        ) : undefined}
      </View>
    </View>
  );
}
