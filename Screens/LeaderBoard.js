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


    static navigationOptions = ({ navigation }) => ({
        title: 'Scoreboard',
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
            <TouchableOpacity style={{marginLeft:15}} onPress={() => navigation.navigate('Home')}>
                <MaterialCommunityIcons name='home-outline' color='grey' size={28} />
            </TouchableOpacity>
          )
      });

    constructor(props) {
        super(props)
        this.state = {
            data: [

            ]
        }
    }


    async getDate() {
        const snapshot = await firebase.firestore().collection('events').get()
        return snapshot.docs.map(doc => doc.data());
    }


    async componentDidMount() {
        let that = this;
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


    renderItem = ({ item, index }) => {
        console.log(item)

        return (
            <View style={{ padding: 10, marginLeft: 40, backgroundColor: '#fff', marginBottom: 20, marginRight: 20, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', marginLeft: -35, marginRight: 20 }}>
                    <Text style={{ fontSize: 8 }}>Score</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Score}</Text>
                </View>
                <Text>{index + 1}.  </Text>
                <Text>{item.label}  </Text>
            </View>

        )
    }




    render() {
        return (
            <View style={styles.container}>
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
