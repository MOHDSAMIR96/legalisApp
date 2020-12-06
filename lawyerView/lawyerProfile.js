import React, {Component, useState, useEffect, useRef }  from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { useSelector, useDispatch } from 'react-redux';


export default function LawyerProfile({navigation}) {

    //REDUX STATE
       const store = useSelector(state => state.userData);
       const dispatch = useDispatch();

       const [cases, setCases] = useState([]);

        useEffect(()=>{

               fetch("http://patoexer.pythonanywhere.com/lawyerCases/" + store.lawyers_id)// es necesario el endpoint the cases con rut abogado
                     .then(response =>{return response.json()})
                     .then((data)=>{
                     console.log( "ACAAA RESPUETA: " + JSON.stringify(data))
                     setCases(data.resp)

                     })
                     .catch(error => console.log(error))
           },[])


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
                    <Text style={styles.welcome}>{store.lawyers_name}</Text>
                    <Text style={styles.instructions}>{store.lawyers_email}</Text>
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
                                    return <TouchableOpacity onPress={()=>{navigation.navigate('LawyerCaseChat')}} key={index}  style={styles.button}><Text style={{color: "white", fontSize: 25}}>{item.client_name}</Text><Text style={{color: "white", fontSize: 10}}>      {item.cases_matter}</Text></TouchableOpacity>
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
});

