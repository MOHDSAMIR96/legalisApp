import React, {Component, useState, useEffect}  from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {PanResponder, Animated} from 'react-native';
import { Video } from 'expo-av';

import { useSelector, useDispatch } from 'react-redux';


export default function VideoComponent({navigation}){//ESTA PARTE ES LA VISTA DE EL INICIO DE LA CONSULTA

    const [subjects, setNewSubjects] = useState(['CONTRATOS', 'HERENCIA', 'FAMILIA', 'LABORAL', 'PREVISIONAL']);

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    useEffect(()=>{


    },[])


    return (

        <Video
           source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}//require('../assets/peliculaConstitucion.mp4')}
           rate={1.0}
           volume={2.0}
           isMuted={false}
           shouldPlay
           isLooping
           resizeMode="cover"
           style={{flex:1, backgroundColor: 'red'}} //, transform: [{ rotate: '90deg'}]
         />

    );
  //}
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

