import * as React from 'react';
import { Image, Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import * as firebase from 'firebase';
import '@firebase/firestore'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Leaderboard from 'react-native-leaderboard';

export default class HomeScreen extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            TotalVotes: 0,
            data: [

            ]
        }
    }


    static navigationOptions = ({ navigation }) => ({
        title: 'Scoreboard',
        headerStyle: {
            // backgroundColor: '#5d599',
          },
        //   headerTintColor: '#5d599',
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
            <TouchableOpacity style={{marginLeft:15}} onPress={() => navigation.navigate('Home')}>
                <MaterialCommunityIcons name='home-outline' color='grey' size={28} />
            </TouchableOpacity>
          )
      });



    async getDate() {
        const snapshot = await firebase.firestore().collection('events').get()
        return snapshot.docs.map(doc => doc.data());
    }

    async componentDidMount() {
        let that = this;
        await firebase.database().ref('Submitted').once('value').then(function(snapshot) {
            that.setState({TotalVotes: snapshot.numChildren()})
          });
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

                        var result = initMessages.sort(function(a, b){
                            return b.Score - a.Score;
                            });
                    // let data2 = data.sort(function (a, b) { return b.Score - a.Score });
                    this.setState({data: result })
                }
            });

    }





    render() {
        return (
            <View style={styles.container}>
                <Text style={{textAlign:'center',fontSize:16,marginVertical:8}}>Total Votes: {this.state.TotalVotes}</Text>
                <Leaderboard
                    data={this.state.data}
                    sortBy='Score'
                    labelBy='label' />
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    Title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingHorizontal: 20
    },
    row: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue',
    },


});
