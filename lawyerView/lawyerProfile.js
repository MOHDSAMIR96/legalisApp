import React, {Component, useState, useEffect, useRef }  from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions, AppState} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

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
       const [asyncStore, setAsyncStore] = useState([]); //THIS REPLACE THE USESELECTOR
       const [cases, setCases] = useState([]);
       const [casesCounting, setCasesCounting] = useState(0);
       const [notificationToken, setNotificationToken] = useState([]);
       const [randomIcon, setRandomIcon] = useState("")

        useEffect(()=>{


        },[cases])

        useEffect(()=>{

               showAsyncStorageData();
               let casesTracker = setInterval(()=>{

                 let arrayOfCasesAndQueries = [];
                 fetch("http://patoexer.pythonanywhere.com/userByLawyers/1")// WE GET ALL NEW CLIENTS NOT TAKEN BY ANY OTHER LAWYER
                     .then(response =>{ return response.json()})
                     .then((data)=>{
                         arrayOfCasesAndQueries.push(...data.resp)
                         dispatchListOfCases(arrayOfCasesAndQueries)
                         setCases(arrayOfCasesAndQueries)

                 })
                 .catch(error => console.log(error))
                 /*fetch("http://patoexer.pythonanywhere.com/lawyerCases/" + store.userData.lawyers_id)//WE GET ALL LAWYER'S CASES
                                                         .then(response => response.json())
                                                         .then((data)=>{
                                                            alert("dsd")
                                                          //arrayOfCasesAndQueries.push(...data.resp)


                                                         fetch("http://patoexer.pythonanywhere.com/userByLawyers/1")// WE GET ALL NEW CLIENTS NOT TAKEN BY ANY OTHER LAWYER
                                                                                             .then(response =>{ response.json()})
                                                                                             .then((data)=>{ //alert("rgtgtgr")

                                                                                             arrayOfCasesAndQueries.push(...data.resp)

                                                                                             setCases(arrayOfCasesAndQueries)
                                                                                             dispatchListOfCases(arrayOfCasesAndQueries)




                                                                                             })
                                                                                             .catch(error => console.log(error))

                                                         })
                                                         .catch(error => console.log(error))*/
                }, 3000);

                //RANDOM ICON ON PROFILE ONLY FOR JOKE

                let randomIconArr = ['law', 'law', 'bug', 'law', 'rocket', 'law', 'law', 'octoface', 'law', 'law'];
                let randomPosition = Math.floor(Math.random() * 10);
                setRandomIcon(randomIconArr[randomPosition]);


                 return ()=>{
                 clearInterval(casesTracker);
                 dispatch({type: "USERDATA", doneAction: ""})

                 }

           },[])


    const showAsyncStorageData = async () =>{
        try{
            let name = AsyncStorage.getItem("lawyerSession")
            .then((value) =>{
            value = JSON.parse(value)
            //THE RETRIVED DATA IS STORED ON COMPONENT HOOK
            setAsyncStore(value)
            })

        }
        catch(err){
            console.log(err)
            }
        }

    const  removeItemValue = async (key)=> {
              try {
                  await AsyncStorage.removeItem(key);
                  console.log('Data removed')
                  navigation.navigate('Home')

              }
              catch(exception) {
                  return false;
              }
          }

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
            token = JSON.stringify(token.data).slice(1, -1);

             notify(token);
            //setNotificationToken(token)

            if(token){ //WE SEND TO FIREBASE BAKEND THE TOKEN
            const resp = await firebase
            .firestore()
            .collection('1')
            .doc('Q6vBYWYcUrAnlxNYBkji')
            .set({token}, {merge: true});
             }
        }


    const notify = (token) => { // THIS ASYNC FUNCTION EXECUTE THE NOTIFICATION ITSELF ON THE DEVICE, REMEMBER DEVICE SIMULATORS DO NOT SHOW NOTIFICATION, THEY ARE NOT SUPPORTED

                const message = {
                 to: token,//"ExponentPushToken[J7t6TCPxhGT-GG5R6WGEeI]",
                 title: "LEGALIS",
                 body: "Un nuevo cliente te esta esperando",
                 sound: "default",
                 ios: { _displayInForeground: true }
                };

                const options =  {
                   method: 'POST',
                   body: JSON.stringify(message),
                   headers: {
                                  Accept: 'application/json',
                                  'Accept-encoding': 'gzip, deflate',
                                  'Content-Type': 'application/json',
                                }
                }

                fetch('https://exp.host/--/api/v2/push/send', options)
                .then((response)=>{ return response.json()})
                .then((data)=>{console.log("resp: " + JSON.stringify(data))})
                .catch((error)=>{ console.log(error)})


              }


    const selectCase =(index) =>{

        dispatchSelectCase(store.listOfCases[index])

        if("users_name" in store.listOfCases[index] && store.listOfCases[index].taken == false){// BECAUSE IT'S A USER, IT HAVE TO MARK IT AS TAKEN, FOR ANY ANOTHER LAWYER TAKE THE USER


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
          <View style={{flex:1, flexDirection: 'column', backgroundColor: "#4170f9", paddingTop: windowHeightPercentUnit*5}}><Text style={{color: 'white', padding: '5%'}} onPress={()=>{removeItemValue('lawyerSession')}}>Cerrar Sesión</Text>
            <View style={{flex:windowHeightPercentUnit}}>
            </View>
            <View style={{flex:windowHeightPercentUnit*2, flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'column'}}>
                    <Text> </Text>
                </View>
                <View style={{flex:2, flexDirection:'column'}}>
                    <Icon rounded color='white' size='60' name={randomIcon} type='octicon' />
                </View>
                <View style={{flex:7, flexDirection:'column'}}>
                    <Text style={styles.welcome}>{asyncStore.lawyers_name }</Text>
                    <Text style={styles.instructions}>{asyncStore.lawyers_email}</Text>
                    <Text style={styles.instructions}>GASTO MENSUAL: {asyncStore.lawyers_spending}</Text>
                </View>
            </View>

            <View style={{flex:windowHeightPercentUnit, flexDirection:'row'}}>
                <View style={{flex:2}}>
                    <Text onPress={()=> showAsyncStorageData()} style={styles.title}>MIS CAUSAS</Text>
                </View>
            </View>

            <View style={{flex: windowHeightPercentUnit*9, flexDirection:'row'}}>
                <ScrollView>
                                    {cases.map((item, index)=>{
                                    if(!item.taken){
                                        return <TouchableOpacity onPress={()=>{selectCase(index)}} key={index}  style={("cases_id" in item)? styles.button: styles.newUser }><Text style={{color: "white", fontSize: windowWidthPercentUnit*6}}>{("cases_id" in item)? item.client_name: item.users_name}</Text><Text style={{color: "white", fontSize: windowWidthPercentUnit*3}}>  {("cases_id" in item)?item.cases_matter: item.users_issue_subject}    </Text></TouchableOpacity>
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