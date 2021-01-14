import React, { Component } from 'react';
import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions } from 'react-native';

import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase'; //https://www.youtube.com/watch?v=ACLzAL2JDxk

// Your web app's Firebase configuration
  let firebaseConfig = {
    apiKey: "AIzaSyA4FFuyAX6bXNQcng34oYoHwvN22kIKPVY",
    authDomain: "legalisapp-42218.firebaseapp.com",
    projectId: "legalisapp-42218",
    storageBucket: "legalisapp-42218.appspot.com",
    messagingSenderId: "528237277754",
    appId: "1:528237277754:web:ca727e985f1986a6eb7b03"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
  }else {
     firebase.app(); // if already initialized, use that one
  }

    // DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);




export class Home extends Component {

constructor(props) {
    super(props);
    this.state = {
      language: 'java',
    };
    this.registerPushNotificationAsync = this.registerPushNotificationAsync.bind(this);
    this.notify = this.notify.bind(this);

  }

  componentDidMount(){
  this.registerPushNotificationAsync();
  }

    registerPushNotificationAsync = async () =>{// THIS ASYNC FUNCTION INSERT INTO FIREBASE DATABASE THE TOKEN OF NOTIFICATION
        const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        console.log(existingStatus);
        let finalStatus = existingStatus;

        if(existingStatus !== 'granted'){
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if(finalStatus!=='granted'){
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token);

        if(token){
        const resp = await firebase
        .firestore()
        .collection('1')
        .doc('Q6vBYWYcUrAnlxNYBkji')
        .set({token}, {merge: true});
         }

    }
    notify = async(token) => { // THIS ASYNC FUNCTION EXECUTE THE NOTIFICATION ITSELF ON THE DEVICE, REMEMBER DEVICE SIMULATORS DO NOT SHOW NOTIFICATION, THEY ARE NOT SUPPORTED

      const message = {
        to: token,
        sound: 'default',
        title: 'NOTIFICACION DE PRUEBA',
        body: 'And here is the body!',
        data: { data: 'goes here' },
      };

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

    }



  render() {
    return (

         <View style={{flex:windowHeight*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex:windowHeight*1, backgroundColor: "#4170f9"}}>{/*<Text onPress={this.notify}>NOTIFY</Text>*/}</View>
            <View style={{flex:windowHeight*7}}>
                <View style={{flex:windowHeight*3, backgroundColor: "#4170f9"}}></View>
               <View style={{flex:windowHeight*15}}>
                    <Image source={require('../images/logo.png')}  style={styles.img}/>
                    <Button color="#3b2960" title="Busco abogado" onPress={() => {this.props.navigation.navigate('Query')}}/>
                    <Text>  </Text>
                    {/*<Button color="#3b2960" title="Ya soy cliente" onPress={() => this.props.navigation.navigate('ClientRegister')}/>
                    <Text>  </Text>*/}
                    <Button color="#3b2960" title="Soy abogado" onPress={() => this.props.navigation.navigate('LawyerRegister')} />
                </View>

            </View>
            <View style={{flex:windowHeight*1, backgroundColor: "#4170f9"}}></View>
          </View>

    );
  }
}


const styles = StyleSheet.create({
   img: {
   height:230,
   width:230,
   marginLeft: 20,
   },
  welcome: {
    textAlign: 'center',
    margin: 0,
    color: "white",
    fontSize: 40,
  },
});

