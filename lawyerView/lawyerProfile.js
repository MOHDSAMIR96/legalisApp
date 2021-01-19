import React, {Component, useState, useEffect, useRef }  from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import {dispatchListOfCases, dispatchSelectCase} from '../redux/dispatcher.js'

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




export default function LawyerProfile({navigation}) {

    //REDUX STATE
       const store = useSelector(state => state);
       const dispatch = useDispatch();

       const [cases, setCases] = useState([]);
       const [notificationToken, setNotificationToken] = useState([]);

        useEffect(()=>{

               getNotificactionToken();
               let arrayOfCasesAndQueries = [];

               fetch("http://patoexer.pythonanywhere.com/lawyerCases/" + store.userData.lawyers_id)//WE GET ALL LAWYER'S CASES
                     .then(response =>{return response.json()})
                     .then((data)=>{
                      arrayOfCasesAndQueries.push(...data.resp)

                     fetch("http://patoexer.pythonanywhere.com/userByLawyers/1")// WE GET ALL NEW CLIENTS NOT TAKEN BY ANY OTRHER LAWYER
                                                         .then(response =>{return response.json()})
                                                         .then((data)=>{
                                                         arrayOfCasesAndQueries.push(...data.resp)

                                                         setCases(arrayOfCasesAndQueries)
                                                         dispatchListOfCases(arrayOfCasesAndQueries)
                                                         })
                                                         .catch(error => console.log(error))

                     })
                     .catch(error => console.log(error))

                 return ()=>{

                 dispatch({type: "USERDATA", doneAction: ""})

                 }

           },[])

    const getNotificactionToken = async () =>{// THIS ASYNC FUNCTION INSERT INTO FIREBASE DATABASE THE TOKEN OF NOTIFICATION
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
            setNotificationToken(token)

            if(token){ //WE SEND TO FIREBASE BAKEND THE TOKEN
            const resp = await firebase
            .firestore()
            .collection('1')
            .doc('Q6vBYWYcUrAnlxNYBkji')
            .set({token}, {merge: true});
             }

             setInterval(()=>notify(token), 1000);

        }

    const notify = async(token) => { // THIS ASYNC FUNCTION EXECUTE THE NOTIFICATION ITSELF ON THE DEVICE, REMEMBER DEVICE SIMULATORS DO NOT SHOW NOTIFICATION, THEY ARE NOT SUPPORTED
                  console.log("vuelve")
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


    const selectCase =(index) =>{

        dispatchSelectCase(store.listOfCases[index])

        if("users_name" in store.listOfCases[index] && store.listOfCases[index].taken == false){// BECAUSE IT'S A USER, HE HAVE TO MARK IT AS TAKEN, FOR ANY ANOTHER LAWYER TAKE THE USER


        let updateUserData = {
                "lawyer_id": store.userData.lawyers_id,
                "taken": 1
            }

            let options = {
                        method: 'PUT',
                        body: JSON.stringify(updateUserData),
                        headers: {'Content-Type': 'application/json'}};

            fetch("http://patoexer.pythonanywhere.com/user/" + store.listOfCases[index].users_id, options)
                .then((response)=> {return response.json()})
                .then((data)=> {

                    navigation.navigate('LawyerCaseChat')
                })
                .catch(error => {console.log(JSON.stringify(error))})

        }
        else{

        navigation.navigate('LawyerCaseChat')
        }

    }


    return (
          <View style={{flex:1, flexDirection: 'column', backgroundColor: "#4170f9"}}>
            <View style={{flex:windowHeightPercentUnit}}>
            </View>
            <View style={{flex:windowHeightPercentUnit*2, flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'column'}}>
                    <Text> </Text>
                </View>
                <View style={{flex:2, flexDirection:'column'}}>
                    <Avatar rounded size="large" icon={{name: 'user', type: 'font-awesome'}} />
                </View>
                <View style={{flex:7, flexDirection:'column'}}>
                    <Text style={styles.welcome}>{store.userData.lawyers_name}</Text>
                    <Text style={styles.instructions}>{store.userData.lawyers_email}</Text>
                    <Text style={styles.instructions}>GASTO MENSUAL: {store.userData.lawyers_spending}</Text>
                </View>
            </View>

            <View style={{flex:windowHeightPercentUnit, flexDirection:'row'}}>
                <View style={{flex:2}}>
                    <Text style={styles.title}>MIS CAUSAS</Text>
                </View>
            </View>

            <View style={{flex: windowHeightPercentUnit*9, flexDirection:'row'}}>
                <ScrollView>
                                    {cases.map((item, index)=>{
                                    if(!item.taken){
                                        return <TouchableOpacity onPress={()=>{selectCase(index)}} key={index}  style={("cases_id" in item)? styles.button: styles.newUser }><Text style={{color: "white", fontSize: windowWidthPercentUnit*6}}>{("cases_id" in item)? item.client_name: item.users_name + " NUEVO" }</Text><Text style={{color: "white", fontSize: windowWidthPercentUnit*3}}>  {("cases_id" in item)?item.cases_matter: item.users_issue_subject}    </Text></TouchableOpacity>
                                    }
                                    })}

                </ScrollView>

            </View>
                <Text></Text>

          </View>
    );

}


const styles = StyleSheet.create({
  instructions: {
    color: 'white',
    backgroundColor: "#4170f9",
    marginBottom: 0,
    borderColor: '#fff',
    fontSize: windowHeightPercentUnit*2,

  },
  title: {
      color: 'white',
      backgroundColor: "#4170f9",
      marginBottom: 0,
      borderColor: '#fff',
      fontSize: windowHeightPercentUnit*4,
      textAlign: 'center',
      margin:0,
      padding:0,
      fontWeight: 'bold'
  },
  welcome: {
      margin: 0,
      color: "white",
      fontSize: windowHeightPercentUnit*4,

    },
    button: {
        alignItems: "center",
        backgroundColor: "#747A87",
        color: "red",
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 60,
        borderRadius: 10
      },
      newUser: {
              alignItems: "center",
              backgroundColor: "#0024DD",
              padding: 10,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              height: 60,
              borderRadius: 10
            }
});

