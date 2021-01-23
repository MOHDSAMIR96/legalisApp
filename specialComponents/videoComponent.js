import React, {Component, useState, useEffect}  from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon} from 'react-native-elements';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {PanResponder, Animated} from 'react-native';
import { Video } from 'expo-av';

import { useSelector, useDispatch } from 'react-redux';


export default function VideoComponent({navigation}){//ESTA PARTE ES LA VISTA DE EL INICIO DE LA CONSULTA

    const [skip, setSkip] = useState(false);

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    useEffect(()=>{

    setTimeout(()=>{ setSkip(true);}, 48000)
    if(skip){navigation.reset([NavigationActions.navigate({routeName: 'QueryChat'})]);}
    },[])

     useEffect(()=>{
        setTimeout(()=>{
        if(skip)
            {
                navigation.reset([NavigationActions.navigate({routeName: 'QueryChat'})]);
            }
        })

     },[skip])


    return (
        <>
        <Video
           source={require('../assets/legalis-usuario.mp4')}//require('../assets/Legalis-Usuario.mp4')}
           rate={1.0}
           volume={2.0}
           isMuted={false}
           shouldPlay
           resizeMode="cover"
           style={{flex:1, backgroundColor: 'red'}}
         />
             <TouchableOpacity onPress={()=>{ (!skip)?navigation.reset([NavigationActions.navigate({routeName: 'QueryChat'})]):console.log("skiped already!")}} style={{backgroundColor: "#747A87", height: 70, color: 'white', alignItems: "center"}} color="white" >
                               <Text></Text>
                                 <Text style={{fontSize:20, color: "white"}}>SALTAR VIDEO</Text>
             </TouchableOpacity>
         </>

    );

}

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 0,
    padding: 20,
    color: "white",
    fontSize: 35,

  },
  instructions: {
      color: 'white',
      backgroundColor: "#4170f9",
      borderColor: '#fff',
      fontSize:25,
      textAlign: "justify",
      padding: 20

    },
});

