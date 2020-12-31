import React, {Component, useState, useEffect, useRef }  from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { useSelector, useDispatch } from 'react-redux';

import {dispatchListOfCases, dispatchSelectCase} from '../redux/dispatcher.js'


export default function LawyerProfile({navigation}) {

    //REDUX STATE
       const store = useSelector(state => state);
       const dispatch = useDispatch();

       const [cases, setCases] = useState([]);

        useEffect(()=>{

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

           },[])


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
              <View style={{flex:1}}></View>
              <View style={{flex:2, flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'column'}}>
                   <Text> </Text>
                </View>
                <View style={{flex:2, flexDirection:'column'}}>
                    <Avatar rounded size="large" icon={{name: 'user', type: 'font-awesome'}} />
                </View>
                <View style={{flex:7, flexDirection:'column'}}>
                    <Text style={styles.welcome}>{store.userData.lawyers_name}</Text>
                    <Text style={styles.instructions}>{store.userData.lawyers_email}</Text>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:2}}>
                       <Text style={styles.title}>MIS CAUSAS</Text>
                  </View>
              </View>

              <View style={{flex:9, flexDirection:'row'}}>

                  <ScrollView>
                                    {cases.map((item, index)=>{
                                    if(!item.taken){
                                        return <TouchableOpacity onPress={()=>{selectCase(index)}} key={index}  style={("cases_id" in item)? styles.button: styles.newUser }><Text style={{color: "white", fontSize: 25}}>{("cases_id" in item)? item.client_name: item.users_name + " NUEVO" }</Text><Text style={{color: "white", fontSize: 10}}>  {("cases_id" in item)?item.cases_matter: item.users_issue_subject}    </Text></TouchableOpacity>
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
    fontSize:15,

  },
  title: {
      color: 'white',
      backgroundColor: "#4170f9",
      marginBottom: 0,
      borderColor: '#fff',
      fontSize:40,
      textAlign: 'center',
      margin:0,
      padding:0,
      fontWeight: 'bold'
  },
  welcome: {
      margin: 0,
      color: "white",
      fontSize: 30,

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
      },
      newUser: {
              alignItems: "center",
              backgroundColor: "#0024DD",
              padding: 10,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              height: 60,
            }
});

