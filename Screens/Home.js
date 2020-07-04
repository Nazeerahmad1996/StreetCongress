import * as React from 'react';
import { Alert, TextInput, Dimensions, StyleSheet, Text, TouchableOpacity, Share, View, ImageBackground, FlatList, StatusBar, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import Modal from 'react-native-modal';

import DraggableFlatList from "react-native-draggable-flatlist";


import * as firebase from 'firebase';
import '@firebase/firestore'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


// const exampleData = [...Array(10)].map((d, index) => ({
//     key: `item-${index}`, // For example only -- don't use index as your key!
//     label: index,
//     name: First,
//     backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
//       5}, ${132})`
//   }));


export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerStyle: {
            backgroundColor: '#5d599',
          },
          headerTintColor: '#5d599',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign:'center'
          },
        headerRight: () => (
            <TouchableOpacity style={{marginRight:15}} onPress={() => firebase.auth().signOut()}>
                <MaterialCommunityIcons name='logout' color='grey' size={26} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity style={{marginLeft:15}} onPress={() => navigation.navigate('LeaderBoard')}>
                <Image source={require('../assets/scoreboard.png')} style={{width:26,height:26}} />
            </TouchableOpacity>
          )
      });

    state = {
        logged: false,
        name: '',
        Post: false,
        Description: '',
        messages: [],
        data: []
    }



    async componentDidMount() {
        firebase
            .database()
            .ref('Score')
            .on("value", snapshot => {
                const data = snapshot.val()
                const count = snapshot.numChildren();
                if (snapshot.val()) {
                    const initMessages = [];
                    Object
                        .keys(data)
                        .forEach(message => initMessages.push(data[message]));
                    this.setState({ messages: initMessages, data: initMessages })
                }
            });
    }


    // Post = async () => {
    //     var user = firebase.auth().currentUser.uid;

    //     let userName;
    //     var docRef = firebase.firestore().collection("Users").doc(user);

    //     await docRef.get().then(function (doc) {
    //         if (doc.exists) {
    //             userName = doc.data().username
    //             console.log("Document data:", doc.data().username);
    //         } else {
    //             userName = 'Anonymous'
    //             // doc.data() will be undefined in this case
    //             console.log("5No such document!");
    //         }
    //     }).catch(function (error) {
    //         console.log("Error getting document:", error);
    //     });
    //     var nodeName = 'Post';

    //     if (this.state.Description != '') {

    //         var newPostRef = firebase.database().ref(nodeName).push({
    //             User: user,
    //             Name: userName,
    //             Description: this.state.Description,
    //             Date: new Date().toDateString(),
    //             Node: "null",
    //             Likes: 0,
    //         }).then((data) => {
    //             this.setState({ Description: '' })
    //             this.setState({ Post: false })
    //             Alert.alert(
    //                 'Upload Successfully'
    //             )
    //             var Key = data.key
    //             firebase.database().ref(nodeName).child(Key).update({
    //                 Node: Key
    //             })
    //             let score = 0
    //             let that = this;
    //             firebase.firestore().collection("Users").doc(user).get().then(function (doc) {
    //                 if (doc.exists) {
    //                     console.log('worl: ', doc.data().Score)
    //                     firebase.firestore().collection("Users").doc(user).update({
    //                         Score: doc.data().Score + 10
    //                     })
    //                 } else {
    //                     firebase.firestore().collection("Users").doc("gorilla").get().then(function (doc) {
    //                         if (doc.exists) {
    //                             console.log('wor5: ', doc.data().Score)
    //                             firebase.firestore().collection("Users").doc("gorilla").update({
    //                                 Score: doc.data().Score + 10
    //                             })
    //                         } else {
    //                             console.log("6No such document!");
    //                         }
    //                     }).catch(function (error) {
    //                         console.log("2Error getting document:", error);
    //                     });
    //                     console.log("1No such document!");
    //                 }
    //             }).catch(function (error) {
    //                 console.log("2Error getting document:", error);
    //             });

    //         }).catch((error) => {
    //             //error callback
    //             Alert.alert(
    //                 'Upload Not Successfully' + error
    //             )
    //         })
    //     }

    //     else {
    //         Alert.alert("Please Fill The Form Proper.")
    //     }
    // }

    submit = () => {
        let score = this.state.data.length
        // firebase.database().ref('Score').push(this.state.data).then((data) => {

        // }).catch((err) => {
        //     console.log('error', err)
        // })
        let _this = this;
        this.state.data.forEach(function(item) {

            _this.state.messages.forEach(function(data){
                if(data.Node == item.Node){
                    firebase.database().ref('Score').child(data.Node).update({
                        Score: score + item.Score,
                    }).then((data) => {
                        // var Key = data.key
                        // firebase.database().ref('Score').child(Key).update({
                        // Node: Key
                        // })
                    }).catch((error) => {
                        //error callback
                        console.log(
                            'Upload Not Successfully' + error
                        )
                    })
                }
            })
            score = score - 1
        });
    }


    renderItem = ({ item, index, drag, isActive }) => {
        return (
          <TouchableOpacity
            style={{
              height: 42,
              backgroundColor: isActive ? "blue" : '#b58b8b',
              alignItems: "center",
              justifyContent: "center",
              borderRadius:5,
              marginVertical:8
            }}
            onLongPress={drag}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: 18
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      };

    render() {
        var userId = firebase.auth().currentUser.uid
        return (
            <View style={{flex:1, marginHorizontal:25}}>
                <Text style={{ fontSize: 20, textAlign:'center' }}>Press item and drag accordingly</Text>
                <DraggableFlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onDragEnd={({ data }) => this.setState({ data })}
                />
                <TouchableOpacity style={{ backgroundColor:'#685353',paddingVertical:8, marginTop:20 }} onPress={this.submit}>
                    <Text style={{
                    fontWeight: "bold",
                    color: "white",
                    textAlign:'center',
                    fontSize: 20
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

// HomeScreen.navigationOptions = {
//     header: null,
// };




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingHorizontal: 20
    },
    modalView: {
        width: '95%',
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgotBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },


});
